import { TiPencil } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { MdRadioButtonUnchecked } from "react-icons/md";

function TodoItem({ title, notes, complete, onChange, onDelete, onModal }) {
  return (
    <div className="bg-slate-700/50 p-4 rounded-lg flex items-start gap-4 transition-all hover:bg-slate-700">
      {complete ? (
        <FaCheckCircle
          onClick={onChange}
          className="text-white hover:text-gray-500 w-6 h-6 mt-1 cursor-pointer"
        />
      ) : (
        <MdRadioButtonUnchecked
          onClick={onChange}
          className="text-white hover:text-gray-500 w-6 h-6 mt-1 cursor-pointer"
        />
      )}
      <div className={`flex-1 ${complete ? "blur-[3px]" : ""}`}>
        <h2
          onClick={onChange}
          className="cursor-pointer text-slate-200 transition-all"
        >
          {title}
        </h2>
        <p className="text-sm">{notes}</p>
      </div>
      <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
        <TiPencil
          onClick={onModal}
          className="text-slate-500 hover:text-sky-400 w-6 h-6 cursor-pointer"
        />
        <RiDeleteBin6Line
          onClick={onDelete}
          className="text-slate-500 hover:text-red-400 w-6 h-6 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default TodoItem;
