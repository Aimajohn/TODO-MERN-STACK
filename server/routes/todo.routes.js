import {Router} from 'express'
import { createTodo, deleteTodo, getTodo, getTodos, putTodo } from '../todoControllers/controller.js'
export const todoRoutes = Router()

todoRoutes.get('/todos', getTodos)

todoRoutes.get('/todo/:id', getTodo)

todoRoutes.post('/todo/', createTodo)

todoRoutes.put('/todo/:id', putTodo)

todoRoutes.delete('/todo/:id', deleteTodo)