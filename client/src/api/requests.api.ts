import axios from "axios";
import dayjs from "dayjs";

interface MyFormValues {
  title: string;
  description: string;
  emoji: string;
}
type Todo = {
  title: string;
  description: string;
  id: number;
  emoji: string;
  status: boolean;
  created_at: string;
};

const local = "http://localhost:4000";
const server = "https://todo-mern-stack-production-9aa8.up.railway.app";

export const createTodoRequest = async (todo: MyFormValues) => {
  const response = await axios.post(`${server}/todo`, todo);
  return response;
};

export const getTodosRequest = async () => {
  const result = await axios.get(`${server}/todos/`, {});
  const data = await result.data.map((todo:Todo) => {
    return {
      ...todo,
      created_at: dayjs(todo.created_at).locale("es-ec").format(),
    };
  });
  result.data = await data;

  return result;
};

export const deleteTodoRequest = async (id: number) =>
  await axios.delete(`${server}/todo/${id}`);

export const getTodoRequest = async (id: number) =>
  await axios.get(`${server}/todo/${id}`);

export const updateTodoRequest = async (id: number, todo: MyFormValues) =>
  await axios.put(`${server}/todo/${id}`, todo);

export const toggleTodoRequest = async (id: number, done: boolean) =>
  await axios.put(`${server}/todo/${id}`, { status: done });
