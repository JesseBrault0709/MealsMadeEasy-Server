const frontendErrorName = 'SpoonacularError'

/**
 * An error to be used when Spoonacular/RapidAPI returns an
 * error response. (If there is no response, another Error should
 * be used instead).
 */
export interface SpoonacularError extends Error {
    name: typeof frontendErrorName

    /** The Spoonacular/RapidAPI endpoint which generated the error response */
    endpoint: string

    /** Any params passed to Spoonacular/RapidAPI */
    params: any

    /** The http status of the response from Spoonacular/RapidAPI */
    status: number

    /** The http statusText of the response from Spoonacular/RapidAPI */
    statusText: string

    /** Any data returned by Spoonacular/RapidAPI */
    data: any
}

/**
 * A type guard to determine if a value is a SpoonacularError object.
 */
export const isSpoonacularError = (u: unknown): u is SpoonacularError => {
    return (
        typeof u === 'object' &&
        u !== null &&
        'name' in u &&
        (u as any).name === frontendErrorName
    )
}

/**
 * Creates a SpoonacularError object.
 *
 * @param endpoint The Spoonacular/RapidAPI endpoint used which generated the error
 * @param params The params passed to the endpoint
 * @param status The status returned by Spoonacular/RapidAPI
 * @param statusText The statusText returned by Spoonacular/RapidAPI
 * @param data Any data returned by Spoonacular/RapidAPI
 * @returns
 */
export const createSpoonacularError = (
    endpoint: string,
    params: any,
    status: number,
    statusText: string,
    data: any
): SpoonacularError => ({
    name: 'SpoonacularError',
    message: 'RapidAPI/Spoonacular responded with an error',
    endpoint,
    params,
    status,
    statusText,
    data
})
