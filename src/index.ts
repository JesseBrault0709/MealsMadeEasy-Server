import express, { Request } from 'express'
import dotenv from 'dotenv'
import { configureComplexSearch } from './endpoints/recipes/complexSearch'
import { configureRecipeInformation } from './endpoints/recipes/recipeInformation'

// Load .env variables into process.env

dotenv.config()

// Express app

const app = express()

// Configure endpoints

configureComplexSearch(app)
configureRecipeInformation(app)

// Run the app

const { PORT } = process.env

app.listen(PORT, () => {
    console.log(`Express app running on port ${PORT}`)
})
