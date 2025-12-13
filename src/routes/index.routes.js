import express from 'express'
import { authRoutes } from './auth.routes.js'
import { kelasRoutes } from './kelas.routes.js'

export const routes = express.Router()

routes.use('/auth', authRoutes)
routes.use('/kelas', kelasRoutes)