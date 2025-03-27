import { useState } from "react"
import { IProduct } from "../models/IProduct"
import { createProduct, DeleteProductByID, getProductByID, getProducts, UpdateProductByID } from "../service/productsService"

export const useProducts = () => {

    const [products, setProducts] = useState<IProduct[]>([])

    const getProductsHandler = async () => {
        try {
            const data = await getProducts()
            setProducts(data)
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

    const getProductByIDHandler = async (id: number) => {
        try {
            const product = await getProductByID(id)
            return product
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

    const UpdateProductByIDHandler = async (id: number, payload: IProduct) => {
        try {
            const product = await UpdateProductByID(id, payload)
            return product
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }

    const CreateProductHandler = async (payload: IProduct) => {
        try {
            const newProduct = await createProduct(payload)
            return newProduct
        } catch (error) {
            console.log("ERROR, ", error)
            throw new Error()
        }
    }

    const DeleteProductByIDHandler = async (id: number) => {
        try {
            await DeleteProductByID(id)
            const message = "This product got deleted"
            return message
        } catch (error) {
            console.log("ERROR Couldn't delete: ", error)
            throw new Error()
        }
    }



    return { products, getProductsHandler, getProductByIDHandler, UpdateProductByIDHandler, CreateProductHandler, DeleteProductByIDHandler }

}