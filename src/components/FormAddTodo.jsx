import { useState } from "react";

function FormAddTodo({ onAdd }) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({ title, notes });
    setTitle("");
    setNotes("");
  }
  return (
    <form onSubmit={handleSubmit}  className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Judul Tugas
        </label>
        <input
          type="text"
          placeholder="Contoh: Belajar REST API"
          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Catatan (Opsional)
        </label>
        <textarea
          placeholder="Detail atau catatan tambahan..."
          rows="5"
          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>
      <button
        
        type="submit"
        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-lg shadow-violet-900/50"
      >
        Simpan Tugas
      </button>
    </form>
  );
}

export default FormAddTodo;
