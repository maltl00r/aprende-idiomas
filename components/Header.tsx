'use client';

import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center shadow-sm">
      <Link href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
        Aprende Idiomas
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-900 font-medium">
              Hola, <span className="text-indigo-600">{user.email}</span>
            </span>
            <button
              onClick={handleSignOut}
              className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors font-semibold"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors">
              Iniciar sesión
            </Link>
            <Link 
              href="/register" 
              className="text-sm bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 shadow-md transition-all"
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}