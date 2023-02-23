import axios from 'axios'

interface MyFormValues {
    title: string;
    description: string;
  }
const local = 'http://localhost:4000'
const server = 'https://todo-mern-stack-production-9aa8.up.railway.app/'

export const createTodoRequest = async(todo:MyFormValues) =>(
    await axios.post(`${server}/todo`, todo)
)

export const getTodosRequest = async () => (
  await axios.get(`${server}/todos/`)
)

export const deleteTodoRequest = async(id:number)=>(
  await axios.delete(`${server}/todo/${id}`)
)

export const getTodoRequest = async(id:number) =>(
  await axios.get(`${server}/todo/${id}`)
)

export const updateTodoRequest = async(id:number, todo:MyFormValues) => (
  await axios.put(`${server}/todo/${id}`, todo)
)

export const toggleTodoRequest = async(id:number, done:boolean) =>(
  
  await axios.put(`${server}/todo/${id}`, {"status": done})

)