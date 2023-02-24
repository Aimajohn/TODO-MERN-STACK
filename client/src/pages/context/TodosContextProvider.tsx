import { TodoContext } from "./TodosContext";
import { ReactElement, useContext, useState } from "react";
import { getTodosRequest, deleteTodoRequest, createTodoRequest, getTodoRequest, updateTodoRequest, toggleTodoRequest} from "../../api/requests.api";


type Props = {
  children: ReactElement;
};
type todo = {
    title: string;
    description: string;
    id: number;
    emoji: string;
    status: boolean;
    created_at: string;
  };
  type MyFormValues ={
    title: string;
    description: string;
    emoji: string;
  }

export const UseTodos = () => {
  const context = useContext(TodoContext);
  
  if (!context)
    throw new Error("UseTodos must be used inside a TodoContextProvider");
  return context;
};



// Handling todos State



// Exporting context

const TodosContextProvider = ({ children }: Props) => {

    const [todos, setTodos] = useState([] as todo[]);

    const getTodos = async () => {
        try {
            const result = await getTodosRequest();
            setTodos(result.data)
            
        } catch (error) {
            console.log(error);
        }
    };

    const getTodo= async(id:number)=>{
        try{
          const result = await getTodoRequest(id)
          return result.data
        }catch(error){
          console.warn(error)
        }
    }


    const deleteTodo = async(id: number) => {
        try {
          const response = await deleteTodoRequest(id);
          setTodos(todos.filter(todo=> todo.id !== id))
        } catch (error) {
          console.log(error);
        }
      }


      const createTodo =  async (values:MyFormValues) => {
        try {
          const response = await createTodoRequest(values);
          setTodos([...todos, response.data])
        } catch (error) {
          console.error(error);
        }
      }

      const updateTodo = async(id:number, values:MyFormValues) => {
        try{
          const response = await updateTodoRequest(id, values);
          console.log(response)

        }catch(error){
          console.warn(error)
        }
        
      }

      const toggleTodo = async(id:number, done: boolean)=>{
        try {
          const response = await toggleTodoRequest(id, done)
          const thisTodo = todos.map(todo => (todo.id != id)? todo: {...todo, status: done}) 
          // const thisTodo = todos.filter(todo => todo.id != id) 

          setTodos(thisTodo)
        } catch (error) {
          console.warn(error)
        }
      }
    
    return (
      <TodoContext.Provider value={{getTodos, todos, deleteTodo, createTodo, getTodo, updateTodo, toggleTodo}}>
        {children}
      </TodoContext.Provider>
    );
  };


export default TodosContextProvider;
