import Header from '@/components/Header';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-blue-50 to-white text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
          Domina idiomas con tecnología
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Gestiona tu aprendizaje de inglés y francés con una plataforma diseñada para estudiantes por estudiantes.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/register" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-indigo-700 transition-all transform hover:-translate-y-1">
            Empieza ahora gratis
          </Link>
          <Link href="#features" className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all">
            Saber más
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto py-20 px-6">
        <div className="text-center mb-14">
          <span className="inline-block bg-indigo-50 text-indigo-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Funcionalidades</span>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">Todo lo que necesitas para aprender</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Una plataforma completa diseñada para acelerar tu dominio del inglés y el francés.</p>
        </div>

        {/* Main 3-col grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 text-indigo-600 font-bold text-sm">EN</div>
            <h3 className="text-xl font-bold mb-3">Inglés Práctico</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Contenido enfocado en gramática y vocabulario técnico para programadores y profesionales.</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 font-bold text-sm">FR</div>
            <h3 className="text-xl font-bold mb-3">Francés Moderno</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Desde niveles básicos hasta la fluidez con ejercicios interactivos y contenido real.</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 text-green-600 font-bold text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Seguimiento Real</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Visualiza tu progreso diario con gráficas claras y gestiona tus tareas pendientes.</p>
          </div>
        </div>

        {/* Second row: 2-col wide + 1 narrow */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="p-8 bg-indigo-600 rounded-3xl text-white hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Práctica con IA</h3>
            <p className="text-white/80 text-sm leading-relaxed">Convierte con un asistente inteligente que corrige tu gramática en tiempo real, sugiere mejoras y adapta los ejercicios a tu nivel.</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Rachas Diarias</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Mantén tu racha activa estudiando cada día. El sistema de recompensas te motiva a no romper la cadena y celebra cada hito.</p>
          </div>
        </div>

        {/* Third row: 3-col */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Pronunciación</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Escucha pronunciaciones nativas y graba tu voz para comparar y mejorar tu acento con retroalimentación visual.</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-6 text-pink-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Vocabulario Flash</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Flashcards con repetición espaciada para memorizar palabras de forma eficiente. El algoritmo se adapta a lo que más te cuesta.</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6 text-teal-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Comunidad</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Comparte tu progreso, reta a otros estudiantes y aprende con compañeros que comparten tu mismo objetivo.</p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-indigo-600 py-16 px-6 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">¿Listo para empezar?</h2>
        <p className="text-indigo-200 mb-8 max-w-lg mx-auto">Únete a miles de estudiantes que ya están mejorando su inglés y francés cada día.</p>
        <a href="/register" className="inline-block bg-white text-indigo-600 font-bold px-10 py-4 rounded-2xl shadow-lg hover:bg-indigo-50 transition-all transform hover:-translate-y-0.5">
          Crear cuenta gratis
        </a>
      </section>
    </div>
  );
}
