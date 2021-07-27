import axios from 'axios'

export const fetchSpoonacular = async (endpoint: string, params: any) => {
    console.log({
        endpoint,
        params
    })

    const { RAPIDAPI_HOST, RAPIDAPI_KEY } = process.env

    const url = `https://${RAPIDAPI_HOST}${endpoint}`

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
}
