import { Application } from 'express'
import { fetchSpoonacular } from '../../spoonacular/fetchSpoonacular'

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
        }
    })
}
