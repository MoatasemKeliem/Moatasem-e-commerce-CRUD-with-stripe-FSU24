import { useContext } from "react"
import { CartContext } from "../Context/CartContext"
import { Product } from "../models/Product"
import { CartActionType } from "../reducers/CartReducer"

export const useAddToCart = () => {
    const { cart, dispatch } = useContext(CartContext)

    const addToCart = (product: Product, quantity: number) => {

        dispatch({
            type: CartActionType.ADD_ITEM,
            payload: { product, quantity }
        })
    }


    return { addToCart }
}