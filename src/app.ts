import bodyParser from 'body-parser'
import express, { Application } from 'express'
import fs from 'fs'
import mongoose from 'mongoose'
import multer from 'multer'
import path from 'path'

import { MONGO_URI } from './utils/config'
import { errorMessage, info } from './utils/logger'
import {
  errorHandler,
  requestLogger,
  unknownEndpoint
} from './utils/middleware'

const app: Application = express()

info('Starting the server...', MONGO_URI)

//! Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    info('Connected to MongoDB')
  })
  .catch((error: Error) => {
    errorMessage('Error connecting to MongoDB', error.message)
  })

//! Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(requestLogger)

//! Routes
app.get('/', (req, res) => {
  res.json({ message: 'anima anime app' })
})

//! Error handling
app.use(unknownEndpoint)
app.use(errorHandler)

export default app
