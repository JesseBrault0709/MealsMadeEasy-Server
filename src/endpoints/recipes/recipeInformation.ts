import type { Application } from 'express'
import { fetchSpoonacular } from '../../spoonacular/fetchSpoonacular'
import { isSpoonacularError } from '../../spoonacular/SpoonacularError'

/**
 * Configures the given app with a GET endpoint for retrieving
 * recipe information.
 *
 * The recipeId is expected in the requests query-string.
 *
 * @see https://spoonacular.com/food-api/docs#Get-Recipe-Information
 *
 * @param app The Express app
 */
export const configureRecipeInformation = (app: Application) => {
    app.get('/recipes/information', async (req, res) => {
        try {
            const results = await fetchSpoonacular(
                `/recipes/${req.query.id}/information`,
                {
                    includeNutrition: req.query.includeNutrition ?? false
                }
            )
            res.status(200).send(results)
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
