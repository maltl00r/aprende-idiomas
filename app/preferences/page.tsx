export const dynamic = 'force-dynamic';

import { createClient } from '@/utils/supabase/server';
import Header from '@/components/Header';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import PreferencesClient from './client';

export default async function PreferencesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get user profile
  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('proficiency_level')
    .eq('id', user.id)
    .single();

  const initialLevel = userProfile?.proficiency_level || 'B1';

  console.log('user.id:', user.id, 'initialLevel:', initialLevel);

  // Get user passions
  const { data: passions } = await supabase
    .from('user_passions')
    .select('passion')
    .eq('user_id', user.id);

  const userPassions = passions?.map(p => p.passion) || [];

  // Get skills mastery
  const { data: skillsData } = await supabase
    .from('skills_mastery')
    .select('skill, level_progress')
    .eq('user_id', user.id);

  const skills = skillsData || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/dashboard" className="text-primary hover:text-primary/80 transition-colors">
              ← Volver
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Preferencias</h1>
          <p className="text-muted-foreground mt-2">Personaliza tu experiencia de aprendizaje según tus intereses y nivel</p>
        </div>

        {/* Client Component */}
        <PreferencesClient 
          userId={user.id}
          initialPassions={userPassions}
          initialSkills={skills}
          initialLevel={'B1'}
        />
      </main>
    </div>
  );
}
