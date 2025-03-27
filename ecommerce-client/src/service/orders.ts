import axios from "axios";
import { ICreateOrder, IOrder } from "../models/IOrder";
import { getRequest } from "./baseService";
import { API_LINK } from "../utils/ApiLink"

const order_API = `${API_LINK}/orders`

export const getOrders = async (): Promise<IOrder[]> => {
    return await getRequest<IOrder[]>(axios.get(order_API))
}

export const getOrderByID = async (id: number): Promise<IOrder[]> => {
    return await getRequest<IOrder[]>(axios.get(`${order_API}/${id}`))
}

export const getOrderByPayment = async (id: string): Promise<IOrder[]> => {
    return await getRequest<IOrder[]>(axios.get(`${order_API}/payment/${id}`))
}

export const createOrder = async (payload: ICreateOrder): Promise<ICreateOrder[]> => {
    return await getRequest<ICreateOrder[]>(axios.post(order_API, payload))
}

// ETT FEL NEDAN
export const UpdateOrderByID = async (id: number, payload: IOrder): Promise<IOrder[]> => {
    return await getRequest<IOrder[]>(axios.patch(`${order_API}/${id}`, payload))
}

export const DeleteOrderByID = async (id: number): Promise<void> => {
    return await getRequest<void>(axios.delete(`${order_API}/${id}`))
}
