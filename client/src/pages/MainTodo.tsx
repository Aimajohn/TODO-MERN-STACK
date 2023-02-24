import { useEffect, useState } from "react";
import TodoCard from "./components/TodoCard";
import {UseTodos} from './context/TodosContextProvider'
import { Link } from "react-router-dom";

type todo = {
  title: string;
  description: string;
  id: number;
  emoji: string;
  status: boolean;
  created_at: string;
};

function MainTodo() {
  const {getTodos, todos} = UseTodos()

  useEffect(() => {
    getTodos();
  }, []);

  function renderTodos(value: todo[]){
    if(value.length === 0) return <h1>No hay tareas creadas aun</h1>
    return (
      <>
      <div className="lg:hidden w-10/12 mx-auto font-poppins font-semibold text-lg bg-gray-100 border-2 border-transparent text-zinc-800 px-5 py-4 rounded-md text-center hover:text-gray-100 hover:bg-[#6688FF] hover:cursor-pointer">
        <Link to={"/new"}>Crear Mensaje</Link>
      </div>
      {
        value.filter(todo=> todo.status !== true).map(todo=> <TodoCard  todo={todo} key={todo.id}/>)
      }
      </>
      )
  }

  return <div className="mx-auto justify-center grid gap-4 mt-6 lg:my-12 grid-cols-auto-cols ">{renderTodos(todos)}</div>;
}

export default MainTodo;
