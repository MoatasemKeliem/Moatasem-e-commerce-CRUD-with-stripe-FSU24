import { useState } from "react"
import { ICustomer } from "../models/ICustomer"
import { createCustomer, DeleteCustomerByID, getCustomerByEmail, getCustomerByID, getCustomers, UpdateCustomerByID } from "../service/customersServive"

export const useCustomer = () => {
    const [customer, setCustomer] = useState<ICustomer[]>([])


    const fetchCustomers = async () => {

        try {
            const data = await getCustomers();
            setCustomer(data)
        } catch (error) {
            console.log("ERROR FETCHING DATA", error)
            throw new Error()
        }
    }

    const deleteCustomersByIdHandler = async (id: number) => {
        try {
            await DeleteCustomerByID(id)
        } catch (error) {
            console.log("ERROR Couldn't delete: ", error)
            throw new Error()
        }
    }

    const createCustomerHandler = async (payload: ICustomer) => {
        try {
            return await createCustomer(payload)
        } catch (error: any) {
            console.log("ERROR COULND'T CREATE CUSTOMER", error.message)
            throw new Error()
        }
    }

    const getCustomerByIDHandler = async (id: number) => {
        try {
            const updatedCustomer = await getCustomerByID(id)
            return updatedCustomer
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

    const getCustomerByEmailHandler = async (email: string) => {
        try {
            const cutsomerByEmail = await getCustomerByEmail(email)
            return cutsomerByEmail
        } catch (error: any) {
            // console.log("Error fetchin customer", error)
            // throw Error()
        }
    }

    const UpdatetCustomerByIDHandler = async (id: number, payload: ICustomer) => {
        try {
            const updatedCustomer = await UpdateCustomerByID(id, payload)
            return updatedCustomer
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }


    return { customer, fetchCustomers, deleteCustomersByIdHandler, createCustomerHandler, UpdatetCustomerByIDHandler, getCustomerByIDHandler, getCustomerByEmailHandler }

}
