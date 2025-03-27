import axios from "axios";
import { ICustomer } from "../models/ICustomer";
import { getRequest } from "./baseService";
import { API_LINK } from "../utils/ApiLink"

const customer_API = `${API_LINK}/customers`

export const getCustomers = async (): Promise<ICustomer[]> => {
    return await getRequest<ICustomer[]>(axios.get(customer_API))
}

export const getCustomerByID = async (id: number): Promise<ICustomer[]> => {
    return await getRequest<ICustomer[]>(axios.get(`${customer_API}/${id}`))
}

export const getCustomerByEmail = async (email: string): Promise<ICustomer[]> => {
    return await getRequest<ICustomer[]>(axios.get(`${customer_API}/email/${email}`))
}

export const createCustomer = async (payload: ICustomer): Promise<ICustomer[]> => {
    return await getRequest<ICustomer[]>(axios.post(customer_API, payload))
}

export const UpdateCustomerByID = async (id: number, payload: ICustomer): Promise<ICustomer[]> => {
    return await getRequest<ICustomer[]>(axios.patch(`${customer_API}/${id}`, payload))
}

export const DeleteCustomerByID = async (id: number): Promise<void> => {
    return await getRequest<void>(axios.delete(`${customer_API}/${id}`))
}
