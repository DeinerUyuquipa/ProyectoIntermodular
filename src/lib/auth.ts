import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = 'super-secret-key-for-rebo3d-dev-only'; // En producción esto debería ser una variable de entorno
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function login(user: any) {
  // Crear el token con los datos básicos del usuario
  const sessionData = { 
    id: user.id, 
    email: user.email, 
    full_name: user.full_name,
    role: user.role 
  };
  
  const encryptedSession = await encrypt(sessionData);

  // Guardar el token en una cookie HTTP-only
  const cookieStore = await cookies();
  cookieStore.set('session', encryptedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 día
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set('session', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;
  
  try {
    return await decrypt(session);
  } catch (error) {
    return null;
  }
}

// Middleware update session
export async function updateSession(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get('session')?.value;
  if (!session) return response;

  try {
    const parsed = await decrypt(session);
    // Refresh the session token so it doesn't expire while the user is active
    const newSession = await encrypt(parsed);
    response.cookies.set({
      name: 'session',
      value: newSession,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    return response;
  } catch (error) {
    // If the token is invalid, clear it
    response.cookies.delete('session');
    return response;
  }
}
