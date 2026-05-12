'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
    } else {
      router.push('/');
      router.refresh(); 
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        {/* Contenedor Principal */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300">
          
          {/* Encabezado */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              ¡Hola de nuevo!
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Ingresa tus credenciales para continuar aprendiendo.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Campo Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input 
                type="email" 
                placeholder="nombre@ejemplo.com" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl 
                          text-gray-900 bg-white
                          focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                          outline-none transition-all placeholder:text-gray-400
                          autofill:shadow-[inset_0_0_0_px_white] autofill:text-fill-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            {/* Campo Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Contraseña
              </label>
              <input 
                type="password" 
                placeholder="••••••••"  
                className="w-full px-4 py-3 border border-gray-200 rounded-xl 
                          bg-white text-black 
                          focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                          outline-none transition-all placeholder:text-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            {/* Botón */}
            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              Iniciar sesión
            </button>
          </form>

          {/* Pie del formulario */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                Regístrate ahora
              </a>
            </p>
          </div>
        </div>
        
        <p className="mt-6 text-center text-xs text-gray-400">
          Al iniciar sesión, confirmas tu acceso a la plataforma.
        </p>
      </div>
    </div>
  );
}