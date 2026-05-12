import { createClient } from '@/utils/supabase/server';
import Header from '@/components/Header';
import Link from 'next/link';

export default async function Lessons() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>No user</div>;
  }

  // Get user passions
  const { data: passions } = await supabase
    .from('user_passions')
    .select('passion')
    .eq('user_id', user.id);

  const userPassions = passions?.map(p => p.passion) || [];

  // Get modules based on passions
  const { data: modules } = await supabase
    .from('modules')
    .select('*')
    .in('passion', userPassions);

  // Get user progress
  const { data: progress } = await supabase
    .from('user_progress')
    .select('module_id, completed')
    .eq('user_id', user.id);

  const completedModules = new Set(progress?.filter(p => p.completed).map(p => p.module_id) || []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Lecciones</h1>
          <p className="text-muted-foreground mt-1">Explora módulos personalizados basados en tus intereses</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules?.map((module) => (
            <div key={module.id} className="bg-card/50 border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">{module.title || 'Sin título'}</h3>
                  <p className="text-sm text-muted-foreground">{module.module_type} - Nivel {module.level}</p>
                </div>
                {completedModules.has(module.id) && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4">{module.description || 'Descripción no disponible'}</p>
              <Link
                href={`/lessons/${module.id}`}
                className="block w-full text-center py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all duration-300"
              >
                {completedModules.has(module.id) ? 'Repasar' : 'Comenzar'}
              </Link>
            </div>
          )) || (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No hay módulos disponibles para tus intereses actuales.</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Actualiza tus pasiones en ajustes para obtener más contenido.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}