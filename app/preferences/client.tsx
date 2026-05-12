'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { updateUserPassions, updateSkillsMastery, updateUserLevel } from './actions';

const AVAILABLE_PASSIONS = [
  'Anime',
  'Superhéroes',
  'Deportes',
  'Música',
  'Videojuegos',
  'Ciencia',
  'Tecnología',
  'Películas',
  'Historia',
  'Arte',
  'Literatura',
  'Viajes',
  'Gastronomía',
  'Política',
  'Negocios',
  'Moda',
  'Fotografía',
  'Educación',
];

const SKILL_NAMES = ['Escucha', 'Habla', 'Lectura', 'Escritura'];
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

interface ClientProps {
  userId: string;
  initialPassions: string[];
  initialSkills: { skill_name: string; mastery_percentage: number }[];
  initialLevel: string;
}

export default function PreferencesClient({
  userId,
  initialPassions,
  initialSkills,
  initialLevel,
}: ClientProps) {
  const [passions, setPassions] = useState<string[]>(
    initialPassions.map(p => p.charAt(0).toUpperCase() + p.slice(1))
  );
  const [skills, setSkills] = useState<{ [key: string]: number }>(
    SKILL_NAMES.reduce((acc, skill) => {
      const skillData = initialSkills.find(s => s.skill_name === skill);
      return {
        ...acc,
        [skill]: skillData?.mastery_percentage || 0,
      };
    }, {})
  );
  const [level, setLevel] = useState(initialLevel);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const handlePassionToggle = useCallback((passion: string) => {
    setPassions(prev => {
      const newPassions = prev.includes(passion)
        ? prev.filter(p => p !== passion)
        : [...prev, passion];
      setHasChanges(true);
      return newPassions;
    });
  }, []);

  const handleSkillChange = useCallback((skillName: string, value: number) => {
    setSkills(prev => ({
      ...prev,
      [skillName]: Math.max(0, Math.min(100, value)),
    }));
    setHasChanges(true);
  }, []);

  const handleLevelChange = useCallback((newLevel: string) => {
    setLevel(newLevel);
    setHasChanges(true);
  }, []);

  const handleSaveChanges = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const results = await Promise.all([
        updateUserPassions(userId, passions.map(p => p.toLowerCase())),
        updateSkillsMastery(
          userId,
          SKILL_NAMES.map(skill => ({
            skill_name: skill,
            mastery_percentage: skills[skill],
          }))
        ),
        updateUserLevel(userId, level),
      ]);

      const hasError = results.some(r => !r.success);

      if (hasError) {
        setMessage({
          type: 'error',
          text: 'Hubo un error al guardar algunos cambios. Por favor, intenta de nuevo.',
        });
      } else {
        setMessage({
          type: 'success',
          text: '¡Preferencias actualizadas correctamente!',
        });
        setHasChanges(false);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error inesperado. Por favor, intenta de nuevo.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Status Message */}
      {message && (
        <div
          className={`p-4 rounded-xl border ${
            message.type === 'success'
              ? 'bg-green-500/10 border-green-500 text-green-500'
              : 'bg-red-500/10 border-red-500 text-red-500'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Passions Section */}
      <section className="bg-card/50 border border-border rounded-2xl p-6 sm:p-8 animate-fade-in">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Tus Pasiones</h2>
          <p className="text-muted-foreground">Selecciona los temas que más te interesan para recibir contenido personalizado</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {AVAILABLE_PASSIONS.map(passion => (
            <button
              key={passion}
              onClick={() => handlePassionToggle(passion)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                passions.includes(passion)
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-background/50 text-muted-foreground border border-border hover:border-primary/30'
              }`}
            >
              {passion}
            </button>
          ))}
        </div>

        {passions.length === 0 && (
          <p className="text-muted-foreground text-sm mt-4">Selecciona al menos una pasión para obtener recomendaciones personalizadas</p>
        )}

        {passions.length > 0 && (
          <p className="text-muted-foreground text-sm mt-4">
            {passions.length} pasión{passions.length > 1 ? 'es' : ''} seleccionada{passions.length > 1 ? 's' : ''}
          </p>
        )}
      </section>

      {/* Level Section */}
      <section className="bg-card/50 border border-border rounded-2xl p-6 sm:p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Nivel de Idioma</h2>
          <p className="text-muted-foreground">Selecciona tu nivel actual para recibir contenido apropiado</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {LEVELS.map(lvl => (
            <button
              key={lvl}
              onClick={() => handleLevelChange(lvl)}
              className={`py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
                level === lvl
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-background/50 text-muted-foreground border border-border hover:border-primary/30'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-background/50 rounded-xl border border-border">
          <p className="text-sm font-medium mb-2">Descripción del nivel {level}:</p>
          <p className="text-sm text-muted-foreground">
            {level === 'A1' && 'Principiante - Vocabulario básico y estructuras simples'}
            {level === 'A2' && 'Básico - Puedes interactuar en situaciones cotidianas'}
            {level === 'B1' && 'Intermedio - Puedes mantener conversaciones sobre temas familiares'}
            {level === 'B2' && 'Intermedio-Alto - Expresión espontánea en la mayoría de situaciones'}
            {level === 'C1' && 'Avanzado - Comprensión profunda y expresión espontánea sin dudas'}
          </p>
        </div>
      </section>

      {/* Skills Mastery Section */}
      <section className="bg-card/50 border border-border rounded-2xl p-6 sm:p-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Habilidades del Idioma</h2>
          <p className="text-muted-foreground">Ajusta tu autoevaluación en cada habilidad (0-100%)</p>
        </div>

        <div className="space-y-6">
          {SKILL_NAMES.map(skill => (
            <div key={skill} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    {skill === 'Escucha' && '🎧'}
                    {skill === 'Habla' && '🗣️'}
                    {skill === 'Lectura' && '📖'}
                    {skill === 'Escritura' && '✍️'}
                  </span>
                  <label className="font-medium">{skill}</label>
                </div>
                <span className="text-lg font-bold text-primary">{skills[skill]}%</span>
              </div>

              <div className="flex gap-4 items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={skills[skill]}
                  onChange={e => handleSkillChange(skill, parseInt(e.target.value))}
                  className="flex-1 h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skills[skill]}
                  onChange={e => handleSkillChange(skill, parseInt(e.target.value) || 0)}
                  className="w-16 px-3 py-2 bg-background/50 border border-border rounded-lg text-center"
                />
              </div>

              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300"
                  style={{ width: `${skills[skill]}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-xl border border-primary/30">
          <p className="text-sm text-muted-foreground">
            💡 <span className="font-medium">Consejo:</span> Sé honesto con tu autoevaluación. Esto nos ayuda a personalizar mejor tu contenido de aprendizaje.
          </p>
        </div>
      </section>

      {/* Summary Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-2xl p-6 sm:p-8">
        <h3 className="text-lg font-bold mb-4">Resumen de Cambios</h3>
        <div className="space-y-2 text-sm">
          <p>✓ Pasiones: {passions.length} seleccionadas</p>
          <p>✓ Nivel: {level}</p>
          <p>✓ Habilidades: Configuradas</p>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex gap-4">
        <button
          onClick={handleSaveChanges}
          disabled={!hasChanges || saving}
          className="flex-1 py-3 px-6 bg-primary hover:bg-primary/90 disabled:bg-muted-foreground/50 text-white font-bold rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
        >
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
        <Link
          href="/dashboard"
          className="py-3 px-6 bg-background/50 hover:bg-background border border-border text-foreground font-bold rounded-xl transition-all duration-300"
        >
          Cancelar
        </Link>
      </div>
    </div>
  );
}
