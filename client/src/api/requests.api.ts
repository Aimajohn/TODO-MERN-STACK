import axios from 'axios'

interface MyFormValues {
    title: string;
    description: string;
  }

export const createTodoRequest = async(todo:MyFormValues) =>(
    await axios.post('http://localhost:4000/todo', todo)
)

export const getTodosRequest = async () => (
  await axios.get('http://localhost:4000/todos/')
)

export const deleteTodoRequest = async(id:number)=>(
  await axios.delete(`http://localhost:4000/todo/${id}`)
)

export const getTodoRequest = async(id:number) =>(
  await axios.get(`http://localhost:4000/todo/${id}`)
)

export const updateTodoRequest = async(id:number, todo:MyFormValues) => (
  await axios.put(`http://localhost:4000/todo/${id}`, todo)
)

export const toggleTodoRequest = async(id:number, done:boolean) =>(
  
  await axios.put(`http://localhost:4000/todo/${id}`, {"status": done})

)