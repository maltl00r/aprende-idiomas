import Header from '@/components/Header';
import Link from 'next/link';

/* ─── small inline SVG icons ─── */
function Icon({ d, className = 'w-5 h-5' }: { d: string; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const features = [
  {
    id: 'accessibility',
    accent: 'bg-primary text-primary-foreground',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    badge: 'Accesibilidad',
    badgeStyle: 'bg-white/20 text-white',
    title: 'Aprende a tu ritmo y a tu manera',
    description:
      'El contenido se adapta a tu velocidad y estilo de aprendizaje. Soporte para dislexia, TDAH y otras capacidades especiales: fuentes ajustables, alto contraste, narración de texto y pausas inteligentes.',
    icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2',
    wide: true,
  },
  {
    id: 'interests',
    accent: 'bg-slate-900 text-white',
    iconBg: 'bg-white/10',
    iconColor: 'text-white',
    badge: 'Personalización',
    badgeStyle: 'bg-white/20 text-white',
    title: 'Aprende con lo que te apasiona',
    description:
      'El aprendizaje se adapta a tus intereses: anime, Marvel, películas, series, música, videojuegos y más. Vocabulario y frases reales tomados de los universos que ya amas.',
    icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    wide: true,
  },
];

const skills = [
  {
    label: 'Listening',
    color: 'bg-blue-500',
    bg: 'bg-blue-50 border-blue-100',
    description: 'Comprensión auditiva con audios nativos, dictados interactivos y ejercicios de escucha activa.',
    icon: 'M3 18v-6a9 9 0 0 1 18 0v6 M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z',
  },
  {
    label: 'Writing',
    color: 'bg-green-500',
    bg: 'bg-green-50 border-green-100',
    description: 'Ejercicios de escritura con corrección gramatical automática y retroalimentación detallada.',
    icon: 'M12 20h9 M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z',
  },
  {
    label: 'Speaking',
    color: 'bg-orange-400',
    bg: 'bg-orange-50 border-orange-100',
    description: 'Practica pronunciación con análisis de voz en tiempo real y comparación con hablantes nativos.',
    icon: 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8',
  },
  {
    label: 'Reading',
    color: 'bg-pink-500',
    bg: 'bg-pink-50 border-pink-100',
    description: 'Lecturas graduadas con vocabulario resaltado, traducciones emergentes y comprensión lectora.',
    icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  },
];

const extras = [
  {
    title: 'Certificación Oficial',
    description:
      'Evaluaciones estructuradas para obtener un certificado de nivel que valide tu inglés ante empleadores y universidades.',
    iconBg: 'bg-accent/10 text-accent',
    icon: 'M12 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z M15.477 12.89L17 22l-5-3-5 3 1.523-9.11',
    badge: 'Próximamente',
    badgeStyle: 'bg-accent/10 text-accent',
    dashed: true,
  },
  {
    title: 'Rachas & Logros',
    description:
      'Mantén tu racha diaria y desbloquea insignias por cada hito. El sistema de puntos te mantiene motivado.',
    iconBg: 'bg-orange-100 text-orange-500',
    icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    badge: null,
    dashed: false,
  },
  {
    title: 'Conversación con IA',
    description:
      'Practica conversaciones reales con un asistente de IA que corrige tus errores en tiempo real y se adapta a tu nivel.',
    iconBg: 'bg-teal-100 text-teal-600',
    icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    badge: null,
    dashed: false,
  },
  {
    title: 'Vocabulario Flash',
    description:
      'Flashcards con repetición espaciada para memorizar palabras. El algoritmo se adapta a lo que más te cuesta.',
    iconBg: 'bg-pink-100 text-pink-600',
    icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
    badge: null,
    dashed: false,
  },
  {
    title: 'Progreso Detallado',
    description:
      'Gráficas claras de tu evolución semanal. Sabe exactamente en qué habilidades debes enfocarte.',
    iconBg: 'bg-indigo-100 text-indigo-600',
    icon: 'M18 20V10 M12 20V4 M6 20v-6',
    badge: null,
    dashed: false,
  },
  {
    title: 'Comunidad',
    description:
      'Comparte tu progreso, reta a otros estudiantes y aprende con personas que comparten tu mismo objetivo.',
    iconBg: 'bg-blue-100 text-blue-600',
    icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
    badge: null,
    dashed: false,
  },
];

const steps = [
  {
    n: '01',
    title: 'Crea tu cuenta gratis',
    body: 'Regístrate en segundos. No necesitas tarjeta de crédito.',
  },
  {
    n: '02',
    title: 'Cuéntanos tus intereses',
    body: 'Anime, deportes, cine, música… elige lo que te gusta y el contenido se adapta.',
  },
  {
    n: '03',
    title: 'Practica cada día',
    body: 'Lecciones cortas y efectivas de listening, writing, speaking y reading.',
  },
  {
    n: '04',
    title: 'Demuestra tu nivel',
    body: 'Próximamente: obtén un certificado oficial que acredite tu progreso.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Cover photo */}
        <div className="relative h-[520px] md:h-[600px]">
          <img
            src="/placeholder.svg?height=600&width=1920"
            alt="Estudiantes aprendiendo inglés"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/90" />

          {/* Hero content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Solo inglés disponible &mdash; más idiomas próximamente
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight text-balance mb-6 max-w-4xl">
              Aprende inglés{' '}
              <span className="text-secondary">a tu ritmo</span>,{' '}
              con lo que te{' '}
              <span className="text-accent">apasiona</span>
            </h1>

            <p className="text-lg text-white/75 max-w-2xl mb-10 leading-relaxed text-pretty">
              La plataforma que adapta el aprendizaje a tus intereses, tu estilo y tus
              capacidades. Listening, writing, speaking y reading en un solo lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-primary/90 transition-all hover:-translate-y-0.5 text-base"
              >
                Empieza gratis ahora
              </Link>
              <Link
                href="#features"
                className="bg-white/10 backdrop-blur border border-white/25 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all text-base"
              >
                Ver funciones
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-card border-b border-border">
          <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '4 habilidades', label: 'Listening · Writing · Speaking · Reading' },
              { value: '100% adaptado', label: 'A tus intereses y capacidades' },
              { value: 'Gratis', label: 'Para empezar, sin tarjeta' },
              { value: 'Certificado', label: 'Próximamente disponible' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-xl font-extrabold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="max-w-6xl mx-auto py-24 px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Funcionalidades
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-balance">
            Todo lo que necesitas para dominar el inglés
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
            Una plataforma pensada para cada persona, cada ritmo y cada pasión.
            De momento disponible en <strong className="text-foreground">inglés</strong>.
          </p>
        </div>

        {/* Row 1: Accessibility + Interests */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {features.map((f) => (
            <div key={f.id} className={`p-8 rounded-3xl ${f.accent} hover:shadow-xl transition-shadow`}>
              <div className={`w-12 h-12 ${f.iconBg} rounded-xl flex items-center justify-center mb-5`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${f.iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={f.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <span className={`inline-block text-xs font-semibold ${f.badgeStyle} px-3 py-1 rounded-full mb-4`}>
                {f.badge}
              </span>
              <p className="text-sm leading-relaxed opacity-80">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Row 2: 4 skills */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
              Las 4 habilidades del idioma
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((s) => (
              <div key={s.label} className={`p-6 ${s.bg} rounded-2xl border hover:shadow-md transition-shadow`}>
                <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-4`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.icon} />
                  </svg>
                </div>
                <h4 className="font-bold text-foreground mb-1 text-base">{s.label}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Extras 3-col */}
        <div className="grid md:grid-cols-3 gap-6">
          {extras.map((e) => (
            <div
              key={e.title}
              className={`p-8 bg-card rounded-3xl border ${e.dashed ? 'border-dashed border-2 border-accent/30' : 'border-border'} hover:shadow-md transition-shadow relative overflow-hidden`}
            >
              {e.badge && (
                <span className={`absolute top-4 right-4 text-xs font-bold ${e.badgeStyle} px-3 py-1 rounded-full`}>
                  {e.badge}
                </span>
              )}
              <div className={`w-12 h-12 ${e.iconBg} rounded-xl flex items-center justify-center mb-6`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={e.icon} />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-foreground">{e.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{e.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10">
          Solo disponible en{' '}
          <span className="font-semibold text-foreground">inglés</span> por ahora.
          Próximamente más idiomas.
        </p>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="bg-card border-y border-border py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              ¿Cómo funciona?
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Tan fácil como 1, 2, 3, 4</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              En menos de 5 minutos ya estarás practicando inglés de una forma que nunca habías vivido.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.n} className="flex flex-col">
                <span className="text-5xl font-black text-primary/15 mb-3 leading-none">{s.n}</span>
                <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTEREST TAGS ── */}
      <section className="max-w-5xl mx-auto py-20 px-6 text-center">
        <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
          Para cada uno
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-balance">
          ¿Cuál es tu universo?
        </h2>
        <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-pretty">
          El contenido se arma con lo que ya disfrutas. Aprende inglés real, no inglés de libro.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            'Anime', 'Marvel & DC', 'Películas', 'Series', 'Música', 'Videojuegos',
            'Deportes', 'Tecnología', 'Viajes', 'Gastronomía', 'Moda', 'Ciencia',
          ].map((tag) => (
            <span
              key={tag}
              className="px-5 py-2.5 bg-card border border-border rounded-full text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="pricing" className="bg-primary py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-white mb-5 text-balance">
            Empieza gratis hoy mismo
          </h2>
          <p className="text-primary-foreground/75 mb-10 text-lg leading-relaxed">
            Únete a estudiantes de todo el mundo que ya están aprendiendo inglés a su manera.
            Sin tarjeta. Sin compromisos.
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-primary font-bold px-12 py-4 rounded-2xl shadow-xl hover:bg-slate-50 transition-all hover:-translate-y-0.5 text-base"
          >
            Crear mi cuenta gratis
          </Link>
          <p className="text-white/50 text-xs mt-5">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="underline text-white/70 hover:text-white">
              Inicia sesión
            </Link>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-card border-t border-border px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <span className="font-bold text-foreground text-sm">
              Aprende<span className="text-primary">Idiomas</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} ApréndeIdiomas. Hecho con pasión para estudiantes de todo el mundo.
          </p>
          <div className="flex gap-5">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacidad</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Términos</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contacto</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
