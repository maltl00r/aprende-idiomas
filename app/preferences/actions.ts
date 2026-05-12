'use server';

import { createAdminClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateUserPassions(userId: string, passions: string[]) {
  const supabase = createAdminClient();

  try {
    console.log('Updating passions for user:', userId, 'passions:', passions);
    
    // Delete existing passions
    const { error: deleteError } = await supabase
      .from('user_passions')
      .delete()
      .eq('user_id', userId);

    if (deleteError) throw deleteError;

    // Insert new passions
    if (passions.length > 0) {
      const passionsToInsert = passions.map(passion => ({
        user_id: userId,
        passion: passion.toLowerCase().trim(),
      }));

      const { data, error } = await supabase
        .from('user_passions')
        .insert(passionsToInsert);

      if (error) throw error;
      console.log('Inserted passions:', data);
    } else {
      console.log('No passions to insert');
    }

    revalidatePath('/preferences');
    revalidatePath('/dashboard');
    return { success: true, message: 'Pasiones actualizadas correctamente' };
  } catch (error: any) {
    console.error('Error updating passions:', error);
    return { success: false, message: error?.message || 'Error al actualizar pasiones' };
  }
}

export async function updateSkillsMastery(
  userId: string,
  skills: { skill: string; level_progress: number }[]
) {
  const supabase = createAdminClient();

  try {
    console.log('Updating skills for user:', userId, 'skills:', skills);
    
    for (const skill of skills) {
      // Validate skill percentage
      if (skill.level_progress < 0 || skill.level_progress > 100) {
        throw new Error(`Porcentaje inválido para ${skill.skill}`);
      }

      const { data: existingSkill, error: selectError } = await supabase
        .from('skills_mastery')
        .select('id')
        .eq('user_id', userId)
        .eq('skill', skill.skill)
        .single();

      if (selectError && selectError.code !== 'PGRST116') {
        throw selectError;
      }

      if (existingSkill) {
        console.log('Updating existing skill:', skill.skill);
        const { data, error: updateError } = await supabase
          .from('skills_mastery')
          .update({
            level_progress: skill.level_progress,
          })
          .eq('user_id', userId)
          .eq('skill', skill.skill);

        if (updateError) throw updateError;
        console.log('Updated skill data:', data);
      } else {
        console.log('Inserting new skill:', skill.skill);
        const { data, error: insertError } = await supabase
          .from('skills_mastery')
          .insert({
            user_id: userId,
            skill: skill.skill,
            level_progress: skill.level_progress,
          });

        if (insertError) throw insertError;
        console.log('Inserted skill data:', data);
      }
    }

    revalidatePath('/preferences');
    revalidatePath('/dashboard');
    return { success: true, message: 'Habilidades actualizadas correctamente' };
  } catch (error: any) {
    console.error('Error updating skills:', error);
    return { success: false, message: error?.message || 'Error al actualizar habilidades' };
  }
}

export async function updateUserLevel(userId: string, level: string) {
  const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1'];
  if (!validLevels.includes(level)) {
    return { success: false, message: 'Nivel inválido' };
  }

  const supabase = createAdminClient();

  try {
    console.log('Updating level for user:', userId, 'level:', level);
    
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({ id: userId, proficiency_level: level }, { onConflict: 'id' });

    if (error) throw error;
    console.log('Updated level data:', data);

    revalidatePath('/preferences');
    revalidatePath('/dashboard');
    return { success: true, message: 'Nivel actualizado correctamente' };
  } catch (error: any) {
    console.error('Error updating level:', error);
    return { success: false, message: error?.message || 'Error al actualizar nivel' };
  }
}
