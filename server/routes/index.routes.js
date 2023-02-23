import {Router} from 'express'
import { pool } from '../db.js'

export const indexRoutes = Router()

indexRoutes.get( '/ping', async (req, res)=>{
    const [rows] = await pool.query('SELECT 1+1 as result')
    res.json('response')
})


