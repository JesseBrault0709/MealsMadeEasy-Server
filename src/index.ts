import express, { Request } from 'express'
import dotenv from 'dotenv'
import {
    complexSearchHandler,
    complexSearchPath
} from './endpoints/recipes/complexSearch'

// Load .env variables into process.env

dotenv.config()

// Express app

const app = express()

app.get(complexSearchPath, complexSearchHandler)

const { PORT } = process.env

app.listen(PORT, () => {
    console.log(`Express app running on port ${PORT}`)
})
