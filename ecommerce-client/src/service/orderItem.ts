import axios from "axios";
import { IOrderItem } from "../models/IOrderItem";
import { getRequest } from "./baseService";
import { API_LINK } from "../utils/ApiLink"

const orderItems_API = `${API_LINK}/order-items`


// ETT FEL NEDAN
export const UpdateOrderItemsByID = async (id: number, payload: IOrderItem): Promise<IOrderItem[]> => {
    return await getRequest<IOrderItem[]>(axios.patch(`${orderItems_API}/${id}`, payload))
}



export const DeleteOrderItemsByID = async (id: number): Promise<void> => {
    return await getRequest<void>(axios.delete(`${orderItems_API}/${id}`))
}
