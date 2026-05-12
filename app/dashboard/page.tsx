import { createClient } from '@/utils/supabase/server';
import Header from '@/components/Header';

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: todos } = await supabase.from('todos').select();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto py-10 px-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bienvenido, {user?.email?.split('@')[0]}</h1>
          <p className="text-gray-500 italic">Panel de control de aprendizaje</p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card de Progreso */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4">Tus Tareas</h2>
            <div className="space-y-3">
              {todos?.map((todo) => (
                <div key={todo.id} className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-4 h-4 rounded-full bg-indigo-400 mr-4"></div>
                  <span className="text-gray-700 font-medium">{todo.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Rápidas */}
          <div className="space-y-6">
            <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg shadow-indigo-100">
              <h3 className="text-sm font-medium opacity-80">Nivel Actual</h3>
              <p className="text-2xl font-bold mt-1 text-white">B1 Intermedio</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Próxima Clase</h3>
              <p className="text-lg font-bold text-gray-900 mt-1">Lunes, 10:00 AM</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}