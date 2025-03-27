import { useContext } from "react"
import { CartActionType } from "../reducers/CartReducer"
import { CartItem } from "../models/CartItem"
import { Product } from "../models/Product"
import { CartContext } from "../Context/CartContext"
import "./../styles/cart.css"
import { Link } from "react-router-dom"

const Cart = () => {
    const { cart, dispatch } = useContext(CartContext)

    const priceToPay = cart.reduce(((total, item: CartItem) => (
        total + (item.quantity * item.product.price)
    )), 0)

    const changeQuantity = (product: Product, quantity: number) => {
        dispatch({
            type: CartActionType.CHANGE_QUANTITY,
            payload: new CartItem(product, quantity)
        })
    }

    const removeFromCart = (itemInCart: CartItem) => {
        dispatch({
            type: CartActionType.REMOVE_ITEM,
            payload: itemInCart
        })
    }

    const resetCart = () => {
        dispatch({
            type: CartActionType.RESET_CART,
            payload: null
        })
    }
    console.log("Current cart state:", cart)


    return (
        <div>
            <h1>Cart</h1>
            {cart.length > 0 ? (<section className="cartProducts">
                {cart.map((item) => {
                    return <div key={item.product.id} className="cartDiv">
                        <h1>{item.product.name}</h1>
                        <button onClick={() => changeQuantity(item.product, 1)}>+</button>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => changeQuantity(item.product, -1)}>-</button>
                        <span>{item.quantity * item.product.price}$</span>
                        <button onClick={() => removeFromCart(item)} className="removeButton">X</button>
                    </div>
                })}
                <div className="priceNReset">
                    <h2>Total Price: {priceToPay}$</h2>
                    {cart.length > 0 && <button onClick={resetCart} className="removeButton">Reset Cart</button>}
                </div>
                <Link to={"/checkout"}><button>Check out</button></Link>
            </section>) :
                (<div className="cartProducts">
                    <h1>Your Cart is empty</h1>
                    <div>
                        <h2>View our products</h2>
                        <Link to={"/products"}><button>Product Page</button></Link>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Cart
