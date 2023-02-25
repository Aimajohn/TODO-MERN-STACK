import { UseTodos } from "../context/TodosContextProvider";
import { useNavigate } from "react-router-dom";

type Todo = {
  title: string;
  description: string;
  id: number;
  emoji: string;
  status: boolean;
  created_at: string;
};

type Props = {
  todo: Todo;
};

function TodoCard({ todo }: Props) {
  const { deleteTodo, getTodo, toggleTodo, todosCreated } = UseTodos();
  const navigate = useNavigate();

  const handleToggle = async (id: number, done: boolean) => {
    const response = await toggleTodo(id, !done);
  };

  return (
    <div
      className={`min-h-[170px] relative font-source bg-zinc-800 p-4 ${
        todo.status ? "line-through opacity-50" : ""
      } w-10/12 mx-auto rounded-md lg:max-w-[400px] flex justify-between lg:w-full`}
    >
      <div className="relative">
        <h1 className="font-semibold font-source text-xl mb-1">{todo.title}</h1>

        <p>{todo.description}</p>
        <div className="mt-3">
          {/* <button
            className="hidden font-semibold absolute bottom-2 mr-3 bg-gray-400 text-gray-800   px-6 py-2 rounded-md hover:bg-zinc-300  hover:text-gray-700"
            onClick={() => navigate(`edit/${todo.id}`)}
          >
            Editar
          </button> */}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-4xl w-16 leading-[64px] text-center bg-zinc-900  rounded-xl h-16 my-auto mr-3">
          {todo.emoji !== "0" ? todo.emoji : "⭕"}
        </div>
        {/* <button className="text-3xl p-3 bg-[#e5e7ebbb] hover:bg-[#e5e7ebff] rounded-xl h-16 my-auto mr-3" onClick={ ()=>handleToggle(todo.id, todo.status) }>{todo.status ? "✔️" : "⭕"}</button> */}
        <div className="text-xs text-gray-200 font-source flex flex-col items-end">
          <p>
            {`${todo.created_at?.split("T")[1].split(":")[0]}:${
              todo.created_at?.split("T")[1].split(":")[1]
            }`}
          </p>
          <p>{todo.created_at?.split("T")[0]}</p>
        </div>
      </div>
      {todosCreated.includes(todo.id) ? (
        <button
          className="absolute top-3 right-3 text-sm"
          onClick={() => handleToggle(todo.id, todo.status)}
        >
          ✖️
        </button>
      ) : null}
    </div>
  );
}

export default TodoCard;
