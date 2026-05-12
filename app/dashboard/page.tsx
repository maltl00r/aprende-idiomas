import { createClient } from '@/utils/supabase/server';
import Header from '@/components/Header';
import Link from 'next/link';

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>No user</div>; // Or redirect
  }

  // Get user passions
  const { data: passions } = await supabase
    .from('user_passions')
    .select('passion')
    .eq('user_id', user.id);

  const userPassions = passions?.map(p => p.passion) || [];

  // Get recommended modules based on passions
  const { data: recommendedModules } = await supabase
    .from('modules')
    .select('*')
    .in('passion', userPassions)
    .limit(5);

  // Get skills mastery
  const { data: skillsData } = await supabase
    .from('skills_mastery')
    .select('skill_name, mastery_percentage')
    .eq('user_id', user.id);

  const skills = skillsData?.map(s => ({
    name: s.skill_name,
    progress: s.mastery_percentage,
    icon: s.skill_name === 'Escucha' ? '🎧' : s.skill_name === 'Habla' ? '🗣️' : s.skill_name === 'Lectura' ? '📖' : '✍️'
  })) || [
    { name: 'Escucha', progress: 0, icon: '🎧' },
    { name: 'Habla', progress: 0, icon: '🗣️' },
    { name: 'Lectura', progress: 0, icon: '📖' },
    { name: 'Escritura', progress: 0, icon: '✍️' },
  ];

  const quickActions = [
    { label: 'Nueva lección', href: '/lessons', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )},
    { label: 'Practicar', href: '/practice', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { label: 'Comunidad', href: '/community', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )},
    { label: 'Ajustes', href: '/settings', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Background effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <header className="mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Bienvenido, <span className="text-primary">{user?.email?.split('@')[0] || 'Usuario'}</span>
              </h1>
              <p className="text-muted-foreground mt-1">Panel de control de aprendizaje</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 border border-border rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Sesión activa</span>
            </div>
          </div>
        </header>

        {/* Quick Actions */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map((action, i) => (
              <Link
                key={action.label}
                href={action.href}
                className="group flex items-center gap-3 p-4 bg-card/50 hover:bg-card border border-border hover:border-primary/30 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {action.icon}
                </div>
                <span className="font-medium text-sm">{action.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills Progress */}
            <section className="bg-card/50 border border-border rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Progreso de Habilidades</h2>
                <span className="text-xs text-muted-foreground bg-background px-3 py-1 rounded-full border border-border">Esta semana</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="group p-4 bg-background/50 rounded-xl border border-border hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{skill.icon}</span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm font-bold text-primary">{skill.progress}%</span>
                    </div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommended Modules */}
            <section className="bg-card/50 border border-border rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Módulos Recomendados</h2>
                <Link href="/lessons" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Ver todas
                </Link>
              </div>
              <div className="space-y-3">
                {recommendedModules && recommendedModules.length > 0 ? (
                  recommendedModules.map((module) => (
                    <div 
                      key={module.id} 
                      className="group flex items-center p-4 bg-background/50 rounded-xl border border-border hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="w-4 h-4 rounded-full bg-primary/20 border-2 border-primary mr-4 group-hover:bg-primary transition-colors duration-300" />
                      <span className="font-medium flex-1">{module.title || 'Módulo sin título'}</span>
                      <svg className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground">No hay módulos recomendados</p>
                    <p className="text-sm text-muted-foreground/70 mt-1">Actualiza tus pasiones para obtener recomendaciones</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Current Level */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-6 rounded-2xl text-white shadow-xl shadow-primary/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h3 className="text-sm font-medium opacity-90">Nivel Actual</h3>
                </div>
                <p className="text-3xl font-bold">B1</p>
                <p className="text-white/80 text-sm mt-1">Intermedio</p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="opacity-80">Progreso al B2</span>
                    <span className="font-bold">68%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>
              </div>
            </section>

            {/* Streak */}
            <section className="bg-card/50 border border-border rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">Racha de estudio</h3>
                  <p className="text-sm text-muted-foreground">Sigue así</p>
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-orange-500">7</span>
                <span className="text-muted-foreground">días consecutivos</span>
              </div>
            </section>

            {/* Next Lesson */}
            <section className="bg-card/50 border border-border rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Próxima Lección</h3>
              <p className="text-lg font-bold mb-1">Conversaciones cotidianas</p>
              <p className="text-sm text-muted-foreground mb-4">Práctica de diálogos</p>
              <Link 
                href="/lessons/next"
                className="block w-full text-center py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                Continuar
              </Link>
            </section>

            {/* Daily Goal */}
            <section className="bg-card/50 border border-border rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Meta diaria</h3>
                <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">En progreso</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-border"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray="75, 100"
                      className="text-primary"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">75%</span>
                </div>
                <div>
                  <p className="font-medium">15 / 20 minutos</p>
                  <p className="text-sm text-muted-foreground">de práctica hoy</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
