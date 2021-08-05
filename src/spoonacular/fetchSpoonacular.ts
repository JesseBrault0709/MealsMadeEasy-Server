import axios from 'axios'
import { createSpoonacularError } from './SpoonacularError'

/**
 * A function which communicates (via axios) with the Spoonacular api (hosted
 * at RapidAPI), taking the Spoonacular endpoint and query-string params and
 * returning the object returned by Spoonacular.
 *
 * @param endpoint the Spoonacular endpoint to access, beginning with '/'
 * @param params an object containing the query-string params to be passed to spoonacular
 * @returns the object returned by spoonacular
 *
 * @throws SpoonacularError if there is an error response from Spoonacular
 * @throws Error if there is no response from spoonacular
 */
export const fetchSpoonacular = async (endpoint: string, params: any) => {
    console.log({
        endpoint,
        params
    })

    const { RAPIDAPI_HOST, RAPIDAPI_KEY } = process.env

    const url = `https://${RAPIDAPI_HOST}${endpoint}`

    try {
        const { status, statusText, headers, data } = await axios.get(url, {
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST
            },
            params
        })

        const {
            'x-ratelimit-requests-remaining': requestsRemaining,
            'x-ratelimit-results-remaining': resultsRemaining
        } = headers

        console.log({
            status,
            statusText,
            requestsRemaining,
            resultsRemaining
        })

        return data
    } catch (err) {
        if (err.response !== undefined) {
            const { status, statusText, headers, data } = err.response

            if (headers !== undefined) {
                const {
                    'x-ratelimit-requests-remaining': requestsRemaining,
                    'x-ratelimit-results-remaining': resultsRemaining
                } = headers

                console.error({
                    status,
                    statusText,
                    requestsRemaining,
                    resultsRemaining
                })
            } else {
                console.error({
                    status,
                    statusText
                })
            }

            throw createSpoonacularError(
                endpoint,
                params,
                status,
                statusText,
                data
            )
        } else {
            throw new Error(`Error while fetching from RapidAPI: ${err}`)
        }
    }
}
