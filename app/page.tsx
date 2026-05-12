import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';

/* ─── Inline SVG helper ─── */
function Icon({ d, className = 'w-5 h-5' }: { d: string; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

/* ─── Data ─── */
const skills = [
  {
    label: 'Escucha',
    color: 'bg-blue-500',
    bg: 'border-blue-500/20 bg-blue-500/5',
    description: 'Comprensión auditiva con audios nativos, dictados interactivos y ejercicios de escucha activa.',
    icon: 'M3 18v-6a9 9 0 0 1 18 0v6 M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z',
  },
  {
    label: 'Habla',
    color: 'bg-orange-400',
    bg: 'border-orange-400/20 bg-orange-400/5',
    description: 'Practica pronunciación con análisis de voz en tiempo real y comparación con hablantes nativos.',
    icon: 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8',
  },
  {
    label: 'Lectura',
    color: 'bg-pink-500',
    bg: 'border-pink-500/20 bg-pink-500/5',
    description: 'Lecturas graduadas con vocabulario resaltado, traducciones emergentes y comprensión lectora.',
    icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  },
  {
    label: 'Escritura',
    color: 'bg-green-500',
    bg: 'border-green-500/20 bg-green-500/5',
    description: 'Ejercicios de escritura con corrección gramatical automática y retroalimentación detallada.',
    icon: 'M12 20h9 M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z',
  },
];

const extras = [
  {
    title: 'Certificación Oficial',
    description: 'Evaluaciones estructuradas para obtener un certificado de nivel que valide tu idioma ante empleadores y universidades.',
    iconBg: 'bg-accent/10 text-accent',
    icon: 'M12 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z M15.477 12.89L17 22l-5-3-5 3 1.523-9.11',
    badge: 'Próximamente',
    badgeStyle: 'bg-accent/10 text-accent border border-accent/20',
    dashed: true,
  },
  {
    title: 'Rachas & Logros',
    description: 'Mantén tu racha diaria y desbloquea insignias por cada hito. El sistema de puntos te mantiene motivado.',
    iconBg: 'bg-orange-500/10 text-orange-400',
    icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    badge: null,
    badgeStyle: '',
    dashed: false,
  },
  {
    title: 'Conversación con IA',
    description: 'Practica conversaciones reales con un asistente de IA que corrige tus errores en tiempo real y se adapta a tu nivel.',
    iconBg: 'bg-teal-500/10 text-teal-400',
    icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    badge: null,
    badgeStyle: '',
    dashed: false,
  },
  {
    title: 'Vocabulario Flash',
    description: 'Flashcards con repetición espaciada para memorizar palabras. El algoritmo se adapta a lo que más te cuesta.',
    iconBg: 'bg-pink-500/10 text-pink-400',
    icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
    badge: null,
    badgeStyle: '',
    dashed: false,
  },
  {
    title: 'Progreso Detallado',
    description: 'Gráficas claras de tu evolución semanal. Sabe exactamente en qué habilidades debes enfocarte.',
    iconBg: 'bg-indigo-500/10 text-indigo-400',
    icon: 'M18 20V10 M12 20V4 M6 20v-6',
    badge: null,
    badgeStyle: '',
    dashed: false,
  },
  {
    title: 'Comunidad Global',
    description: 'Comparte tu progreso, reta a otros estudiantes y aprende con personas de todo el mundo que comparten tu objetivo.',
    iconBg: 'bg-blue-500/10 text-blue-400',
    icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
    badge: null,
    badgeStyle: '',
    dashed: false,
  },
];

const steps = [
  {
    n: '01',
    title: 'Crea tu cuenta gratis',
    body: 'Regístrate en segundos. Sin tarjeta de crédito. Sin compromisos.',
  },
  {
    n: '02',
    title: 'Cuéntanos tus intereses',
    body: 'Superhéroes, deportes, anime, música… elige lo que te apasiona y el contenido se adapta.',
  },
  {
    n: '03',
    title: 'Practica cada día',
    body: 'Lecciones cortas y efectivas de escucha, habla, lectura y escritura.',
  },
  {
    n: '04',
    title: 'Demuestra tu nivel',
    body: 'Próximamente: obtén un certificado oficial que acredite tu progreso real.',
  },
];

const interestTags = [
  'Anime', 'Superhéroes', 'Videojuegos', 'Deportes', 'Música', 'Tecnología',
  'Ciencia', 'Películas', 'Series', 'Viajes', 'Gastronomía', 'Moda',
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-grid">
        {/* Glow blob */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-primary/10 blur-[100px]" aria-hidden />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center">
          {/* Pill badge */}
          <span className="inline-flex items-center gap-2 bg-muted border border-border text-muted-foreground text-xs font-semibold px-4 py-1.5 rounded-full mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Solo inglés disponible &mdash; más idiomas próximamente
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-[1.08] text-balance mb-6 animate-fade-in-up">
            Aprende nuevos idiomas{' '}
            <span className="text-primary">a tu ritmo</span>,{' '}
            con lo que te{' '}
            <span className="text-accent">apasiona</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed text-pretty animate-fade-in-up delay-100">
            La plataforma que adapta el aprendizaje de idiomas a tus intereses, tu estilo y tus
            capacidades. Escucha, habla, lectura y escritura en un solo lugar.{' '}
            <strong className="text-foreground font-semibold">100% gratuito.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
            <Link
              href="/register"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-0.5 text-base"
            >
              Empieza gratis ahora
            </Link>
            <Link
              href="#features"
              className="bg-muted border border-border text-foreground px-8 py-4 rounded-xl font-bold hover:bg-muted/80 hover:border-primary/40 transition-all text-base"
            >
              Ver funciones
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '4 habilidades', label: 'Escucha · Habla · Lectura · Escritura' },
              { value: '100% adaptado', label: 'A tus intereses y capacidades' },
              { value: 'Completamente gratis', label: 'Sin tarjeta. Sin pagos ocultos.' },
              { value: 'Sin anuncios', label: 'Nunca. La educación es libre.' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <p className="text-xl font-extrabold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MISSION
      ══════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <span className="inline-block bg-success/10 text-success text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-success/20">
          Nuestra misión
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-balance">
          Creemos que aprender idiomas debe ser{' '}
          <span className="text-primary">gratuito</span> y accesible para todos
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty text-lg">
          Sin importar tu país, tu nivel económico o tu punto de partida: la educación de calidad
          es un derecho, no un privilegio. Por eso construimos esta plataforma sin anuncios,
          sin planes de pago y sin letra pequeña.
        </p>

        {/* Free highlights */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4 text-left">
          {[
            {
              icon: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
              title: 'Sin anuncios, nunca',
              desc: 'Ningún banner, pop-up ni interrupción publicitaria. Aprendes sin distracciones.',
            },
            {
              icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3z',
              title: 'Sin pagos ocultos',
              desc: 'No existe plan premium, suscripción ni cobro alguno. Ni un solo centavo.',
            },
            {
              icon: 'M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0',
              title: 'Acceso universal',
              desc: 'Abierto para cualquier persona en cualquier lugar del mundo. Sin barreras.',
            },
          ].map((item) => (
            <div key={item.title} className="p-6 bg-card border border-border rounded-2xl hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Icon d={item.icon} className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════ */}
      <section id="features" className="max-w-6xl mx-auto py-24 px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-primary/20">
            Funcionalidades
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-balance">
            Todo lo que necesitas para dominar un nuevo idioma
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
            Una plataforma pensada para cada persona, cada ritmo y cada pasión.
            Por ahora disponible en{' '}
            <strong className="text-foreground">inglés</strong>,{' '}
            con más idiomas en camino.
          </p>
        </div>

        {/* Feature cards row 1 */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {/* Accessibility card */}
          <div className="p-8 rounded-2xl bg-primary border border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all group">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-5">
              <Icon d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2" className="w-6 h-6 text-white" />
            </div>
            <span className="inline-block text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full mb-4">
              Accesibilidad
            </span>
            <h3 className="text-xl font-bold text-white mb-2">Aprende a tu ritmo y a tu manera</h3>
            <p className="text-white/75 text-sm leading-relaxed">
              El contenido se adapta a tu velocidad y estilo de aprendizaje. Soporte para dislexia, TDAH y
              otras capacidades especiales: fuentes ajustables, alto contraste, narración de texto y pausas inteligentes.
            </p>
          </div>

          {/* Personalization card */}
          <div className="p-8 rounded-2xl bg-card border border-border hover:shadow-xl hover:border-border/80 transition-all group">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
              <Icon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" className="w-6 h-6 text-accent" />
            </div>
            <span className="inline-block text-xs font-semibold bg-accent/10 text-accent px-3 py-1 rounded-full mb-4 border border-accent/20">
              Personalización
            </span>
            <h3 className="text-xl font-bold text-foreground mb-2">Aprende con lo que te apasiona</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Superhéroes, anime, deportes, videojuegos, música, ciencia, tecnología y cualquier otra pasión tuya.
              Las lecciones se construyen con el contenido que ya disfrutas para que aprender sea entretenido y relevante.
            </p>
          </div>
        </div>

        {/* Skills row */}
        <div className="mb-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
              Las 4 habilidades del idioma
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((s) => (
              <div
                key={s.label}
                className={`p-6 ${s.bg} rounded-2xl border hover:scale-[1.02] transition-transform`}
              >
                <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon d={s.icon} className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-foreground mb-1 text-base">{s.label}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Extras grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {extras.map((e) => (
            <div
              key={e.title}
              className={`p-7 bg-card rounded-2xl border ${
                e.dashed ? 'border-dashed border-2 border-accent/30' : 'border-border'
              } hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all relative overflow-hidden`}
            >
              {e.badge && (
                <span className={`absolute top-4 right-4 text-xs font-bold ${e.badgeStyle} px-3 py-1 rounded-full`}>
                  {e.badge}
                </span>
              )}
              <div className={`w-11 h-11 ${e.iconBg} rounded-xl flex items-center justify-center mb-5`}>
                <Icon d={e.icon} className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold mb-2 text-foreground">{e.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{e.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10">
          Actualmente disponible en{' '}
          <span className="font-semibold text-foreground">inglés</span>. Más idiomas llegarán próximamente.
        </p>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section id="how" className="bg-card border-y border-border py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-secondary/20">
              ¿Cómo funciona?
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Tan fácil como 1, 2, 3, 4
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              En menos de 5 minutos ya estarás practicando el idioma de una forma que nunca habías vivido.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.n} className="flex flex-col">
                <span className="text-5xl font-black text-primary/15 mb-3 leading-none select-none">
                  {s.n}
                </span>
                <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INTEREST TAGS
      ══════════════════════════════════════════ */}
      <section id="interests" className="max-w-5xl mx-auto py-20 px-6 text-center">
        <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-5 border border-accent/20">
          Para cada uno
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-balance">
          ¿Cuál es tu pasión?
        </h2>
        <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-pretty">
          El contenido se construye con lo que ya disfrutas. Aprende vocabulario y frases reales,
          no inglés de libro de texto. Cada lección se adapta a tu universo.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {interestTags.map((tag) => (
            <span
              key={tag}
              className="px-5 py-2.5 bg-card border border-border rounded-full text-sm font-semibold text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMMUNITY
      ══════════════════════════════════════════ */}
      <section id="community" className="bg-card border-y border-border py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block bg-blue-500/10 text-blue-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-blue-500/20">
            Comunidad
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5 text-balance">
            Aprende junto a miles de estudiantes
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-12 text-pretty leading-relaxed">
            No aprendes solo. Forma parte de una comunidad global de personas que comparten tu
            objetivo: dominar nuevos idiomas sin barreras económicas. Motívate, colabora y celebra
            cada logro juntos.
          </p>
          <div className="grid sm:grid-cols-3 gap-5 text-left">
            {[
              {
                icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
                title: 'Foros y debates',
                desc: 'Discute dudas, comparte recursos y aprende de otros estudiantes de todo el mundo.',
              },
              {
                icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z',
                title: 'Retos semanales',
                desc: 'Compite de forma amistosa en desafíos de vocabulario y pronunciación cada semana.',
              },
              {
                icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z',
                title: 'Logros compartidos',
                desc: 'Muestra tus insignias, rachas y niveles alcanzados a tu red de compañeros.',
              },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-background border border-border rounded-2xl hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon d={item.icon} className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-primary py-24 px-6 text-center">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" aria-hidden />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block bg-white/15 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 border border-white/20">
            100% gratuito, para siempre
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 text-balance">
            Empieza a aprender idiomas hoy mismo
          </h2>
          <p className="text-white/70 mb-10 text-lg leading-relaxed">
            Únete a estudiantes de todo el mundo que ya aprenden nuevos idiomas a su manera.
            Sin tarjeta. Sin anuncios. Sin letra pequeña.
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-primary font-bold px-12 py-4 rounded-xl shadow-xl hover:bg-white/95 transition-all hover:-translate-y-0.5 text-base"
          >
            Crear mi cuenta gratis
          </Link>
          <p className="text-white/40 text-xs mt-5">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="underline text-white/60 hover:text-white transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="bg-card border-t border-border px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Top row */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
            {/* Brand */}
            <div className="flex flex-col gap-3 max-w-xs">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/favicon.ico"
                    alt="ApréndeIdiomas"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
                <span className="font-bold text-foreground text-sm">
                  Aprende<span className="text-primary">Idiomas</span>
                </span>
              </Link>
              <p className="text-xs text-muted-foreground leading-relaxed">
                La plataforma gratuita y accesible para aprender idiomas a tu manera.
                Sin anuncios, sin pagos, sin barreras.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <p className="font-semibold text-foreground text-xs uppercase tracking-widest">Plataforma</p>
                <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Funciones</Link>
                <Link href="#how" className="text-muted-foreground hover:text-foreground transition-colors">¿Cómo funciona?</Link>
                <Link href="#community" className="text-muted-foreground hover:text-foreground transition-colors">Comunidad</Link>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-semibold text-foreground text-xs uppercase tracking-widest">Cuenta</p>
                <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">Iniciar sesión</Link>
                <Link href="/register" className="text-muted-foreground hover:text-foreground transition-colors">Registrarse</Link>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-semibold text-foreground text-xs uppercase tracking-widest">Legal</p>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacidad</Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Términos</Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contacto</Link>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} ApréndeIdiomas. Hecho con pasión para estudiantes de todo el mundo.
            </p>
            <p className="text-xs text-muted-foreground">
              La educación debe ser gratuita y accesible para todos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
