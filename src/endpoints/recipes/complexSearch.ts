import { Application } from 'express'
import { fetchSpoonacular } from '../../spoonacular/fetchSpoonacular'
import { isSpoonacularError } from '../../spoonacular/SpoonacularError'

/**
 * Configures the given app with a GET endpoint for retrieving
 * a list of recipes.
 *
 * All query params are passed directly to the fetchSpoonacular
 * function.
 *
 * @see https://spoonacular.com/food-api/docs#Search-Recipes-Complex
 *
 * @param app The Express app
 */
export const configureComplexSearch = (app: Application) => {
    app.get('/recipes/complexSearch', async (req, res) => {
        try {
            const results = await fetchSpoonacular(
                '/recipes/complexSearch',
                req.query
            )
            res.status(200)
            res.send(results)
        } catch (err) {
            console.error(err)
            if (isSpoonacularError(err)) {
                res.status(err.status).send(err.data)
            } else {
                res.status(500).send()
            }
        }
    })
}
