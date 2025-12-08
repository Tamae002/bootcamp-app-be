import express from 'express'
import { authRoutes } from './auth.routes.js'

export const routes = express.Router()

routes.use('/auth', authRoutes)
