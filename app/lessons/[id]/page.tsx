import { createClient } from '@/utils/supabase/server';
import Header from '@/components/Header';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

interface PageProps {
  params: { id: string };
}

async function completeModule(moduleId: string, userId: string, moduleType: string) {
  const supabase = await createClient();

  // Insert or update progress
  const { error: progressError } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      module_id: moduleId,
      completed: true,
      score: 100, // Assume full score for now
      time_spent: 10, // minutes
      created_at: new Date().toISOString(),
    });

  if (progressError) {
    console.error('Error updating progress:', progressError);
    return;
  }

  // Update skills mastery based on module type
  const skillMap: { [key: string]: string } = {
    'listening': 'Escucha',
    'speaking': 'Habla',
    'reading': 'Lectura',
    'writing': 'Escritura',
  };

  const skill = skillMap[moduleType] || 'Lectura'; // Default

  // Get current mastery
  const { data: currentMastery } = await supabase
    .from('skills_mastery')
    .select('level_progress')
    .eq('user_id', userId)
    .eq('skill', skill)
    .single();

  const newMastery = Math.min(100, (currentMastery?.level_progress || 0) + 5); // Increase by 5%

  const { error: skillError } = await supabase
    .from('skills_mastery')
    .upsert({
      user_id: userId,
      skill: skill,
      level_progress: newMastery,
    });

  if (skillError) {
    console.error('Error updating skills:', skillError);
  }

  revalidatePath(`/lessons/${moduleId}`);
}

async function recordInteraction(moduleId: string, userId: string, interactionType: 'view' | 'like' | 'save') {
  const supabase = await createClient();

  // Get or create interaction record
  const { data: existingInteraction } = await supabase
    .from('user_interactions')
    .select('*')
    .eq('user_id', userId)
    .eq('module_id', moduleId)
    .single();

  const updateData = existingInteraction || {};
  
  if (interactionType === 'like') {
    updateData.liked = !updateData.liked;
  } else if (interactionType === 'save') {
    updateData.saved = !updateData.saved;
  } else if (interactionType === 'view') {
    updateData.viewed = true;
  }

  const { error } = await supabase
    .from('user_interactions')
    .upsert({
      user_id: userId,
      module_id: moduleId,
      ...updateData,
      created_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error recording interaction:', error);
  }
}

export default async function LessonPage({ params }: PageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const moduleId = params.id;

  // Record view
  await recordInteraction(moduleId, user.id, 'view');

  // Get module
  const { data: module } = await supabase
    .from('modules')
    .select('*')
    .eq('id', moduleId)
    .single();

  if (!module) {
    return <div>Módulo no encontrado</div>;
  }

  // Get user progress
  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('module_id', moduleId)
    .single();

  const isCompleted = progress?.completed || false;

  // Get interactions
  const { data: interaction } = await supabase
    .from('user_interactions')
    .select('liked, saved')
    .eq('user_id', user.id)
    .eq('module_id', moduleId)
    .single();

  const isLiked = interaction?.liked || false;
  const isSaved = interaction?.saved || false;

  // Parse content (assuming it's JSON with text, questions, etc.)
  let content;
  try {
    content = JSON.parse(module.content);
  } catch {
    content = { text: module.content };
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/lessons" className="text-primary hover:text-primary/80 mb-4 inline-block">
            ← Volver a lecciones
          </Link>
          <h1 className="text-3xl font-bold">{module.title}</h1>
          <p className="text-muted-foreground mt-1">{module.module_type} - Nivel {module.level}</p>
        </div>

        <div className="bg-card/50 border border-border rounded-2xl p-6 mb-6">
          {content?.text && (
            <div className="prose prose-invert max-w-none mb-6">
              <p>{content.text}</p>
            </div>
          )}

          {content?.questions && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Preguntas</h3>
              {content.questions.map((q: any, i: number) => (
                <div key={i} className="p-4 bg-background/50 rounded-xl">
                  <p className="font-medium">{q.question}</p>
                  {q.options && (
                    <div className="mt-2 space-y-1">
                      {q.options.map((opt: string, j: number) => (
                        <div key={j} className="flex items-center">
                          <input type="radio" name={`q${i}`} value={opt} className="mr-2" />
                          <label>{opt}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Interaction buttons */}
          <div className="flex gap-4 mt-6 pt-6 border-t border-border">
            <form action={async () => {
              'use server';
              await recordInteraction(moduleId, user.id, 'like');
              revalidatePath(`/lessons/${moduleId}`);
            }}>
              <button
                type="submit"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isLiked ? 'bg-red-500/10 text-red-500' : 'bg-background/50 text-muted-foreground hover:text-red-500'
                }`}
              >
                <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isLiked ? 'Me gusta' : 'Me gusta'}
              </button>
            </form>

            <form action={async () => {
              'use server';
              await recordInteraction(moduleId, user.id, 'save');
              revalidatePath(`/lessons/${moduleId}`);
            }}>
              <button
                type="submit"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isSaved ? 'bg-blue-500/10 text-blue-500' : 'bg-background/50 text-muted-foreground hover:text-blue-500'
                }`}
              >
                <svg className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {isSaved ? 'Guardado' : 'Guardar'}
              </button>
            </form>
          </div>
        </div>

        {!isCompleted && (
          <form action={async () => {
            'use server';
            await completeModule(moduleId, user.id, module.module_type);
          }}>
            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all duration-300"
            >
              Completar Módulo
            </button>
          </form>
        )}

        {isCompleted && (
          <div className="text-center py-4">
            <p className="text-green-500 font-medium">¡Módulo completado!</p>
          </div>
        )}
      </main>
    </div>
  );
}