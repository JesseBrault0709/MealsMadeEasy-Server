import type { Application } from 'express'
import { fetchSpoonacular } from '../../spoonacular/fetchSpoonacular'

export const recipeInformation = (app: Application) => {
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
            res.status(500).send()
        }
    })
}
