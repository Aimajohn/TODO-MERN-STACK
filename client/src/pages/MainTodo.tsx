import { useEffect, useState } from "react";
import TodoCard from "./components/TodoCard";
import {UseTodos} from './context/TodosContextProvider'

type todo = {
  title: string;
  description: string;
  id: number;
  status: boolean;
  created_at: string;
};

function MainTodo() {
  const {getTodos, todos} = UseTodos()

  useEffect(() => {
    getTodos();
    console.log('hola',todos)
  }, []);

  function renderTodos(value: todo[]){
    if(value.length === 0) return <h1>No hay tareas creadas aun</h1>
    return value.map(todo=> <TodoCard  todo={todo} key={todo.id}/>)
  }

  return <div className="mx-auto justify-center grid gap-4 my-12 grid-cols-auto-cols ">{renderTodos(todos)}</div>;
}

export default MainTodo;
