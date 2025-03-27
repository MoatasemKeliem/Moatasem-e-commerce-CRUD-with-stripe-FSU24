import { useState } from "react"
import { IOrderItem } from "../models/IOrderItem"
import { DeleteOrderItemsByID, UpdateOrderItemsByID } from "../service/orderItem"


const useOrderItem = () => {



    const [orderItems, setOrderItems] = useState<IOrderItem[]>([])



    const UpdateOrderItemsByIdHandler = async (id: number, payload: IOrderItem) => {
        try {
            const data = await UpdateOrderItemsByID(id, payload)
            setOrderItems(data)
        } catch (error) {
            console.error(error)
            throw new Error()
        }
    }


    const DeleteOrderItemByIdHandler = async (id: number) => {
        try {
            return await DeleteOrderItemsByID(id)
        } catch (error) {
            console.error(error)
            throw new Error()
        }
    }




    return { orderItems, setOrderItems, UpdateOrderItemsByIdHandler, DeleteOrderItemByIdHandler }
}

export default useOrderItem
