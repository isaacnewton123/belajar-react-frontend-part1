import TodoItem from "./TodoItem";

function TodoList({ todos, onChange, onDelete, onModal }) {
  return (
    <div className="lg:col-span-3">
      <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold">Daftar Tugas</h2>
          <div className="flex items-center gap-2 bg-slate-700/50 p-1 rounded-lg">
            <button className="px-3 py-1 text-sm rounded-md bg-slate-700 text-white transition">
              Semua
            </button>
            <button className="px-3 py-1 text-sm text-slate-400 hover:bg-slate-700/50 hover:text-white rounded-md transition">
              Aktif
            </button>
            <button className="px-3 py-1 text-sm text-slate-400 hover:bg-slate-700/50 hover:text-white rounded-md transition">
              Selesai
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-lg">
              <h3 className="mt-2 text-lg font-medium text-white">
                Belum ada tugas
              </h3>
              <p className="mt-1 text-sm text-slate-400 ">
                Saatnya bersantai atau tambah tugas baru!
              </p>
            </div>
          ) : (
            todos.map((a) => (
              <TodoItem
                key={a._id}
                title={a.title}
                notes={a.notes}
                complete={a.completed}
                onChange={() => onChange(a)}
                onDelete={() => onDelete(a)}
                onModal={() => onModal(a)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
