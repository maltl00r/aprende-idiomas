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
      <section id="features" className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-3 gap-8">
        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 text-indigo-600 font-bold">EN</div>
          <h3 className="text-xl font-bold mb-3">Inglés Práctico</h3>
          <p className="text-gray-600 text-sm">Contenido enfocado en la gramática y vocabulario técnico para programadores.</p>
        </div>
        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 font-bold">FR</div>
          <h3 className="text-xl font-bold mb-3">Francés Moderno</h3>
          <p className="text-gray-600 text-sm">Desde niveles básicos hasta la fluidez con ejercicios interactivos.</p>
        </div>
        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 text-green-600 font-bold">✓</div>
          <h3 className="text-xl font-bold mb-3">Seguimiento Real</h3>
          <p className="text-gray-600 text-sm">Visualiza tu progreso diario y gestiona tus tareas pendientes.</p>
        </div>
      </section>
    </div>
  );
}