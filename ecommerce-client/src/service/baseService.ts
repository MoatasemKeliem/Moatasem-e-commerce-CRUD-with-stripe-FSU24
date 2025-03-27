import { AxiosResponse } from "axios"

export const getRequest = async<T>(request: Promise<AxiosResponse<T>>): Promise<T> => {

    try {
        const response = await request
        return response.data
    } catch (error) {
        console.error("Couldn't fetch data", error)
        throw new Error()
    }

}

