import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';
import { login } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, full_name } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña son obligatorios' }, { status: 400 });
    }

    // Verificar si el usuario ya existe
    const [existing]: any = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
    
    if (existing.length > 0) {
      return NextResponse.json({ error: 'El email ya está registrado' }, { status: 400 });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insertar el nuevo usuario
    const [result]: any = await db.execute(
      'INSERT INTO users (email, password_hash, full_name) VALUES (?, ?, ?)',
      [email, password_hash, full_name || '']
    );

    const newUser = {
      id: result.insertId,
      email,
      full_name,
      role: 'customer'
    };

    // Iniciar sesión automáticamente tras el registro
    await login(newUser);

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Error interno del servidor al registrar' }, { status: 500 });
  }
}
