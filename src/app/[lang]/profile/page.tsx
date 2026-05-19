"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUser(data.user);
          } else {
            router.push('/login');
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  if (isLoading) {
    return <div className="min-h-[70vh] flex items-center justify-center">Cargando...</div>;
  }

  if (!user) return null;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-8 min-h-[75vh]">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-4 bg-primary/10 rounded-full text-primary">
          <User className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">¡Bienvenido, {user.full_name || 'Usuario'}!</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="bg-card border shadow-sm rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border/50 bg-muted/20">
          <h2 className="text-xl font-semibold flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            Cambiar Contraseña
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Actualiza tu contraseña para mantener tu cuenta segura.
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="current-password">Contraseña actual</Label>
            <Input id="current-password" type="password" placeholder="••••••••" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-password">Nueva contraseña</Label>
            <Input id="new-password" type="password" placeholder="••••••••" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
            <Input id="confirm-password" type="password" placeholder="••••••••" />
          </div>

          <Button className="w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
}
