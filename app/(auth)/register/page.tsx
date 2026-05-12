'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      setSuccess(true);
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
        <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md animate-fade-in-up">
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/favicon.ico"
                alt="Logo"
                width={48}
                height={48}
                className="rounded-xl transition-transform group-hover:scale-105"
              />
              <span className="text-2xl font-bold text-foreground">
                Aprende<span className="text-primary">Idiomas</span>
              </span>
            </Link>
          </div>

          <div className="bg-card p-8 rounded-2xl border border-border shadow-2xl shadow-primary/5 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">¡Revisa tu correo!</h2>
            <p className="text-muted-foreground mb-6">
              Te hemos enviado un enlace de confirmación a <span className="text-foreground font-medium">{email}</span>
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              Ir a iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      {/* Background grid pattern */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />

      {/* Gradient orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={48}
              height={48}
              className="rounded-xl transition-transform group-hover:scale-105"
            />
            <span className="text-2xl font-bold text-foreground">
              Aprende<span className="text-primary">Idiomas</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-card p-8 rounded-2xl border border-border shadow-2xl shadow-primary/5">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
              ¡Únete gratis!
            </h1>
            <p className="mt-2 text-muted-foreground">
              Comienza tu aventura aprendiendo idiomas hoy.
            </p>
          </div>

          {/* Free badge */}
          <div className="mb-6 p-3 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium text-primary">100% gratuito, sin tarjeta de crédito</span>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Email field */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="nombre@ejemplo.com"
                className="w-full px-4 py-3.5 bg-muted border border-border rounded-xl 
                          text-foreground placeholder:text-muted-foreground
                          focus:ring-2 focus:ring-primary focus:border-primary 
                          outline-none transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                className="w-full px-4 py-3.5 bg-muted border border-border rounded-xl 
                          text-foreground placeholder:text-muted-foreground
                          focus:ring-2 focus:ring-primary focus:border-primary 
                          outline-none transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {/* Confirm password field */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Confirmar contraseña
              </label>
              <input
                type="password"
                placeholder="Repite tu contraseña"
                className="w-full px-4 py-3.5 bg-muted border border-border rounded-xl 
                          text-foreground placeholder:text-muted-foreground
                          focus:ring-2 focus:ring-primary focus:border-primary 
                          outline-none transition-all duration-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl 
                        shadow-lg shadow-primary/25 transition-all duration-200 
                        hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 
                        active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creando cuenta...
                </span>
              ) : (
                'Crear cuenta gratis'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground">
              ¿Ya tienes una cuenta?{' '}
              <Link
                href="/login"
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom note */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          La educación debe ser gratuita y accesible para todos.
        </p>
      </div>
    </div>
  );
}
