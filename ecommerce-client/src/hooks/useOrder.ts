import { useState } from "react"
import { ICreateOrder, IOrder } from "../models/IOrder"
import { createOrder, DeleteOrderByID, getOrderByID, getOrderByPayment, getOrders, UpdateOrderByID } from "../service/orders"


export const useOrder = () => {

    const [orders, setOrders] = useState<IOrder[]>([])
    const [newOrder, setNewOrder] = useState<ICreateOrder[]>([])

    const getOrdersHandler = async () => {
        try {
            const data = await getOrders()
            setOrders(data)

        } catch (error) {
            console.error(error)
            throw new Error()
        }
    }

    const getOrderByIdHandler = async (id: number) => {
        try {
            const data = await getOrderByID(id)
            return data
        } catch (error) {
            console.error(error)
            throw new Error()
        }

    }

    const getOrderByPaymentIdHandler = async (id: string) => {
        try {
            const data = await getOrderByPayment(id)
            return data
        } catch (error) {
            console.error(error)
            throw new Error()
        }

    }


    const createOrderHandler = async (payload: ICreateOrder) => {
        try {
            const data = await createOrder(payload)
            setNewOrder(data)
            return data.id
            // const createdOrder = data[0]
            // const orderId = createdOrder.id
            // return orderId
        } catch (error) {
            console.error(error)
            throw new Error()
        }
    }

    const UpdateOrderByIdHandler = async (id: number, payload: IOrder) => {
        try {
            const data = await UpdateOrderByID(id, payload)
            setOrders(data)
        } catch (error) {
            console.error(error)
            throw new Error()
        }
    }

    const deleteOrderbyIdHandler = async (id: number) => {
        try {
            return await DeleteOrderByID(id)
        } catch (error) {
            console.error(error)
            throw new Error()
        }
    }


    return { orders, newOrder, setOrders, getOrdersHandler, getOrderByIdHandler, createOrderHandler, UpdateOrderByIdHandler, deleteOrderbyIdHandler, getOrderByPaymentIdHandler }
}