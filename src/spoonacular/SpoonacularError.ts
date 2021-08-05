const frontendErrorName = 'SpoonacularError'

export interface SpoonacularError extends Error {
    name: typeof frontendErrorName
    endpoint: string
    params: any
    status: number
    statusText: string
    data: any
}

export const isSpoonacularError = (u: unknown): u is SpoonacularError => {
    return (
        typeof u === 'object' &&
        u !== null &&
        'name' in u &&
        (u as any).name === frontendErrorName
    )
}

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
