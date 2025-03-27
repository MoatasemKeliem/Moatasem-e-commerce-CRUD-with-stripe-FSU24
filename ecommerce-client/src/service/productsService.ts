import axios from "axios";
import { IProduct } from "../models/IProduct";
import { getRequest } from "./baseService";
import { API_LINK } from "../utils/ApiLink"

const products_API = `${API_LINK}/products`

export const getProducts = async (): Promise<IProduct[]> => {
    return await getRequest<IProduct[]>(axios.get(`${products_API}`))
}

export const getProductByID = async (id: number): Promise<IProduct> => {
    return await getRequest<IProduct>(axios.get(`${products_API}/${id}`))
}

export const createProduct = async (payload: IProduct): Promise<IProduct[]> => {
    return await getRequest<IProduct[]>(axios.post(products_API, payload))
}

export const UpdateProductByID = async (id: number, payload: IProduct): Promise<IProduct[]> => {
    return await getRequest<IProduct[]>(axios.patch(`${products_API}/${id}`, payload))
}

export const DeleteProductByID = async (id: number): Promise<void> => {
    return await getRequest<void>(axios.delete(`${products_API}/${id}`))
}
