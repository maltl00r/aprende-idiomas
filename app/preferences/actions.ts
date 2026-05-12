'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateUserPassions(userId: string, passions: string[]) {
  const supabase = await createClient();

  try {
    // Delete existing passions
    await supabase
      .from('user_passions')
      .delete()
      .eq('user_id', userId);

    // Insert new passions
    if (passions.length > 0) {
      const passionsToInsert = passions.map(passion => ({
        user_id: userId,
        passion: passion.toLowerCase().trim(),
      }));

      const { error } = await supabase
        .from('user_passions')
        .insert(passionsToInsert);

      if (error) throw error;
    }

    revalidatePath('/preferences');
    return { success: true, message: 'Pasiones actualizadas correctamente' };
  } catch (error: any) {
    console.error('Error updating passions:', error);
    return { success: false, message: error?.message || 'Error al actualizar pasiones' };
  }
}

export async function updateSkillsMastery(
  userId: string,
  skills: { skill_name: string; mastery_percentage: number }[]
) {
  const supabase = await createClient();

  try {
    for (const skill of skills) {
      // Validate skill percentage
      if (skill.mastery_percentage < 0 || skill.mastery_percentage > 100) {
        throw new Error(`Porcentaje inválido para ${skill.skill_name}`);
      }

      await supabase
        .from('skills_mastery')
        .upsert({
          user_id: userId,
          skill_name: skill.skill_name,
          mastery_percentage: skill.mastery_percentage,
        });
    }

    revalidatePath('/preferences');
    return { success: true, message: 'Habilidades actualizadas correctamente' };
  } catch (error: any) {
    console.error('Error updating skills:', error);
    return { success: false, message: error?.message || 'Error al actualizar habilidades' };
  }
}

export async function updateUserLevel(userId: string, level: string) {
  const supabase = await createClient();

  const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1'];
  if (!validLevels.includes(level)) {
    return { success: false, message: 'Nivel inválido' };
  }

  try {
    const { error } = await supabase
      .from('user_profiles')
      .update({ proficiency_level: level })
      .eq('user_id', userId);

    if (error) throw error;

    revalidatePath('/preferences');
    return { success: true, message: 'Nivel actualizado correctamente' };
  } catch (error: any) {
    console.error('Error updating level:', error);
    return { success: false, message: error?.message || 'Error al actualizar nivel' };
  }
}
