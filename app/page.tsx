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
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">Todo lo que necesitas para aprender inglés</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Una plataforma pensada para cada persona, cada ritmo y cada pasión.</p>
        </div>

        {/* Row 1 — Highlight cards (accessibility + personalization) */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Accessibility */}
          <div className="p-8 bg-indigo-600 rounded-3xl text-white hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Recursos a tu ritmo</h3>
            <span className="inline-block text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full mb-4">Accesibilidad &amp; capacidades especiales</span>
            <p className="text-white/80 text-sm leading-relaxed">El contenido se adapta a tu velocidad, estilo de aprendizaje y necesidades particulares. Soporte para dislexia, TDAH y otras capacidades especiales: fuentes ajustables, alto contraste, narración de texto y pausas inteligentes.</p>
          </div>

          {/* Personalized by interests */}
          <div className="p-8 bg-gray-900 rounded-3xl text-white hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Aprende con lo que te gusta</h3>
            <span className="inline-block text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full mb-4">Contenido personalizado</span>
            <p className="text-white/80 text-sm leading-relaxed">El aprendizaje se adapta a tus intereses: anime, Marvel, películas, series, música y más. Aprende vocabulario y frases reales extraídas de los universos que ya amas.</p>
          </div>
        </div>

        {/* Row 2 — 4 skills */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Las 4 habilidades del idioma</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Listening</h4>
              <p className="text-gray-500 text-xs leading-relaxed">Comprensión auditiva con audios nativos, dictados y ejercicios de escucha activa.</p>
            </div>
            <div className="p-6 bg-green-50 rounded-2xl border border-green-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Writing</h4>
              <p className="text-gray-500 text-xs leading-relaxed">Ejercicios de escritura con corrección gramatical automática y retroalimentación detallada.</p>
            </div>
            <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-orange-400 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Speaking</h4>
              <p className="text-gray-500 text-xs leading-relaxed">Practica pronunciación con análisis de voz en tiempo real y comparación con hablantes nativos.</p>
            </div>
            <div className="p-6 bg-pink-50 rounded-2xl border border-pink-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Reading</h4>
              <p className="text-gray-500 text-xs leading-relaxed">Lecturas graduadas con vocabulario resaltado, traducciones emergentes y comprensión lectora.</p>
            </div>
          </div>
        </div>

        {/* Row 3 — Coming soon certification + extra features */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Certification — coming soon */}
          <div className="p-8 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 hover:shadow-md transition-shadow relative overflow-hidden">
            <span className="absolute top-4 right-4 text-xs font-bold bg-amber-100 text-amber-600 px-3 py-1 rounded-full">Próximamente</span>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6 text-amber-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Certificación Oficial</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Evaluaciones estructuradas para obtener un certificado de nivel que valide tu dominio del idioma ante empleadores y universidades.</p>
          </div>

          {/* Daily streaks */}
          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Rachas &amp; Logros</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Mantén tu racha diaria y desbloquea insignias por cada hito alcanzado. El sistema de puntos te mantiene motivado para seguir aprendiendo.</p>
          </div>

          {/* AI conversation */}
          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6 text-teal-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Conversación con IA</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Practica conversaciones reales con un asistente de IA que corrige tus errores en tiempo real y se adapta a tu nivel actual.</p>
          </div>
        </div>

        {/* Disclaimer: only English available */}
        <p className="text-center text-xs text-gray-400 mt-8">
          De momento solo disponible en <span className="font-semibold text-gray-500">inglés</span>. Próximamente más idiomas.
        </p>
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
