import { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { CartItem } from "../models/CartItem";
import { CartReducer, ICartAction } from "../reducers/CartReducer";

export interface ICartContext {
    cart: CartItem[];
    dispatch: Dispatch<ICartAction>
}

export const CartContext = createContext<ICartContext>({ cart: [], dispatch: () => null })

export const CartProvider = ({ children }: PropsWithChildren) => {
    const [cart, dispatch] = useReducer(CartReducer, [], () => {
        const savedCart = localStorage.getItem("cart")
        return savedCart ? JSON.parse(savedCart) : []
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])


    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

