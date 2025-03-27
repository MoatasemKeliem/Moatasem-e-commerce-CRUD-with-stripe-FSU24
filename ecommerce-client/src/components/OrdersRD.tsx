import { useEffect } from "react"
import { useOrder } from "../hooks/useOrder"
import { Link } from "react-router-dom"
import "../styles/manageOrdersNCustomers.css"


const OrdersRD = () => {
    const { getOrdersHandler, deleteOrderbyIdHandler, orders } = useOrder()

    useEffect(() => {
        getOrdersHandler()
        console.log(orders)
    }, [orders])

    return (
        <section className="section">
            <div className="section">
                {orders.map((item) => {
                    return (
                        <div key={item.id} className="manageDiv">
                            <h1>Order ID: {item.customer_id}</h1>
                            <h2>Name: {item.customer_firstname || "Guest"} {item.customer_lastname}</h2>
                            <p>Total Price: {item.total_price}$</p>
                            <p>Payment Status: {item.payment_status}</p>
                            <p> Payment ID: {item.payment_id}</p>
                            <p>Order Status: {item.order_status}</p>
                            <p>{item.created_at}</p>
                            <button onClick={() => { deleteOrderbyIdHandler((Number(item.id))) }}>Delete Order</button>
                            <Link to={`/update_order/${item.id}`}><button>Update Order</button></Link>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default OrdersRD
