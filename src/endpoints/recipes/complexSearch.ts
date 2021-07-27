import { Handler } from 'express'
import { fetchSpoonacular } from '../../spoonacular/fetchSpoonacular'

export const complexSearchPath = '/recipes/complexSearch'

export const complexSearchHandler: Handler = async (req, res) => {
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
}
