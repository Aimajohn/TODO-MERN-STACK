
import express from 'express'
import {PORT} from './config.js'
import {indexRoutes} from './routes/index.routes.js'
import {todoRoutes} from './routes/todo.routes.js'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import cors from 'cors'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
app.use(cors())
app.use(express.json())
app.use(indexRoutes)
app.use(todoRoutes)
app.use(express.static(join(__dirname,'../client/dist' )))
app.listen(PORT)
console.log(`Server ejecutado en puerto ${PORT}`)