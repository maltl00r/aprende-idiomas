'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert('¡Revisa tu correo para confirmar el registro!');
      router.push('/login');
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
          ¡Bienvenido!
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Comienza tu aventura aprendiendo idiomas hoy.
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-5">
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

        {/* Campo Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contraseña
            </label>
            <input 
              type="password" 
              placeholder="••••••••"  
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
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
          Crear cuenta
        </button>
      </form>

      {/* Pie del formulario */}
      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
    
    {/* Nota al pie (opcional) */}
    <p className="mt-6 text-center text-xs text-gray-400">
      Al registrarte, aceptas nuestros términos y condiciones.
    </p>
  </div>
</div>
  );
}