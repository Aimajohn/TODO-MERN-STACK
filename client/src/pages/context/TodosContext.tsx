import {createContext} from 'react'
import {AxiosResponse} from 'axios'

type todo = {
    title: string;
    description: string;
    id: number;
    status: boolean;
    emoji: string;
    created_at: string;
  };

  type MyFormValues ={
    title: string;
    description: string;
    emoji: string;
  }

interface TodoActionsContext {
    todos: todo[] ;
    todosCreated: number[];
    getTodos():void ;
    deleteTodo(id:number):void ;
    createTodo(value: MyFormValues):void ;
    getTodo(id:number):Promise<todo[]>;
    updateTodo(id:number, value:MyFormValues):void;
    toggleTodo(id:number, done:boolean):void;
    storageTodos(response?: AxiosResponse<any> | null ):Promise<void>;
}

export const TodoContext = createContext<TodoActionsContext>({} as TodoActionsContext); 