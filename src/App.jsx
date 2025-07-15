import { useState, useEffect } from "react";
import FormAddTodo from "./components/FormAddTodo";
import TodoList from "./components/TodoList";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTodoComplete,
} from "./services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalEditTodo from "./components/EditTodoModal";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isSucces, setIsSucces] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const get = await getTodos();
        setTodos(get);
        setIsSucces("berhasil mengambil data");
      } catch (error) {
        console.error("gagal mengambil data", error);
        setIsError("Gagal Mengambil Data");
      } finally {
        setisLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
  }, [isError]);

  useEffect(() => {
    if (isSucces) {
      toast.success(isSucces);
    }
  }, [isSucces]);

  useEffect(() => {
    if (isLoading === true) {
      toast.loading("loading");
    }
  }, [isLoading]);

  const handlePostTodo = async (value) => {
    setisLoading(true);
    try {
      const postsTodo = await createTodo(value);

      setTodos((prevTodos) => [...prevTodos, postsTodo]);
      setIsSucces("Berhasil Mengirim data");
    } catch (error) {
      console.log("gagal mengirim data", error);
      setIsError("gagal mengirim data");
    } finally {
      setisLoading(false);
    }
  };

  const handleComplete = async (item) => {
    setisLoading(true);
    try {
      const updateIsComplete = await updateTodoComplete(item, !item.completed);

      setTodos((prevTodos) =>
        prevTodos.map((a) =>
          a._id === item._id
            ? { ...a, completed: updateIsComplete.completed }
            : a
        )
      );
      setIsSucces("tugas berhasil di update");
    } catch (error) {
      console.error("gagal mengupdate data", error);
      setIsError("gagal mengupdate data", error);
    } finally {
      setisLoading(false);
    }
  };

  const handleUpdateTodo = async (item) => {
    setisLoading(true);
    try {
      const updateTodos = await updateTodo(item);

      setTodos((prevTodos) =>
        prevTodos.map((a) => (a._id === item._id ? updateTodos : a))
      );
      setIsSucces("tugas berhasil di perbaharui");
      closeModal();
    } catch (error) {
      console.error("tidak dapat mengubah data", error);
      setIsError("tidak dapat mengubah data");
    } finally {
      setisLoading(false);
    }
  };

  const handleDeleteTodo = async (item) => {
    setisLoading(true);
    try {
      await deleteTodo(item);

      setTodos((prevTodos) => prevTodos.filter((a) => a._id !== item._id));
      setIsSucces("berhasil Menghapu data");
    } catch (error) {
      console.error("tidak dapat menghapus data", error);
      setIsError("tidak dapat menghapus data");
    } finally {
      setisLoading(false);
    }
  };

  const openModal = (todo) => {
    console.log("1. Data saat membuka modal:", todo);

    setEditTodo(todo);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditTodo(null);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-slate-800 text-white">
      <div className="min-h-screen w-full p-4 sm:p-8 flex flex-col items-center">
        <header className="text-center my-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Daftar Tugasku
          </h1>
          <p className="text-slate-400 mt-2">
            Fokus pada apa yang penting hari ini.
          </p>
        </header>
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 sticky top-8">
              <h2 className="text-2xl font-semibold mb-4">Tambah Tugas Baru</h2>
              <FormAddTodo onAdd={handlePostTodo} />
            </div>
          </div>
          <TodoList
            todos={todos}
            onChange={handleComplete}
            onDelete={handleDeleteTodo}
            onModal={openModal}
          />
          {isModalOpen === true ? (
            <ModalEditTodo
              todo={editTodo}
              onUpdate={handleUpdateTodo}
              onCancel={closeModal}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
