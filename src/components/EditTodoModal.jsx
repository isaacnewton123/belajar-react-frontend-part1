import { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";


function ModalEditTodo({ todo, onUpdate, onCancel }) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setNotes(todo.notes || "");
    }
  }, [todo]);

  function formUpdateTodo(e) {
    e.preventDefault();
    if (!title.trim()) return;

    onUpdate({ ...todo, title, notes });
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md transform transition-all shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Edit Tugas</h2>
          <MdOutlineCancel
            onClick={onCancel}
            className="w-6 h-6 text-slate-400 hover:text-white transition-colors cursor-pointer"
          />
        </div>
        <form onSubmit={formUpdateTodo} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Judul Tugas
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Catatan
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300"
            ></textarea>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={onCancel}
              type="button"
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditTodo;
