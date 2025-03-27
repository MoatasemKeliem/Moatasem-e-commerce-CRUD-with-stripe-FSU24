import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getOrderByID } from "../service/orders"
import "./../styles/manageOrdersNCustomers.css"

const OrderConfirmation = () => {
    const [session_idURL] = useSearchParams()
    const [orderData, setOrderData] = useState<any>(null)
    const id = session_idURL.get("session_id")

    console.log("Fetching order with session_id:", id);

    useEffect(() => {
        if (!id) {
            console.error("session_id is missing")
            return;
        }

        const getOrderById = async () => {
            if (!id) return;
            try {
                const response = await fetch(`http://localhost:3000/orders/payment/${id}`)
                if (!response.ok) {
                    console.error("Order were not found")
                    throw new Error("ORder not found")
                }

                const data = await response.json()



                setOrderData(data)


            } catch (error) {
                console.log("Couldn't get order by ID: ", error)
            }
        }
        getOrderById()


    }, [id, getOrderByID])



    console.log("This is order data: ", orderData)

    return (
        <div className="page">
            <h1>Order Confirmation</h1>

            {orderData === null ? <h4>Couldn't find order</h4> : (
                <> <h1>Thank you for shopping from us, {orderData.customer_firstname} {orderData.customer_lastname}!</h1>
                    <section className="section">


                        <div className="manageDiv">
                            <h2>Customer Information</h2>
                            <p><span>Customer name:</span> {orderData.customer_firstname} {orderData.customer_lastname}</p>
                            <p><span>Country and City:</span> {orderData.customer_city} {orderData.customer_country}</p>
                            <p><span>Email: </span>{orderData.customer_email} </p>
                            <p><span>Phone number:</span> {orderData.customer_phone}</p>
                            <p><span>Postal Code:</span> {orderData.customer_postal_code}</p>
                            <p><span>Street Address:</span> {orderData.customer_street_address}</p>
                            <p><span>Street Address:</span> {orderData.created_at.split(18, -1)}</p>
                        </div>
                        <div className="manageDiv">
                            <h2>Order Information</h2>
                            <p><span>Order Status: </span>{orderData.id}</p>
                            <p><span>Order Status: </span>{orderData.order_status}</p>
                            <p><span>Order Status: </span>{orderData.payment_status}</p>
                            <p><span>Order Status: </span>{orderData.payment_id}</p>

                        </div>
                    </section><section>
                        <h2>Your Products</h2>

                        {orderData && orderData.order_items.map((item: any) => {
                            return (

                                <div key={item.id} className="productConfirmationDiv">
                                    {/* <h2>Shopped Products</h2> */}
                                    <div className="productBought">
                                        <p><span>Product:</span> {item.product_name} </p>
                                        <p><span>Quantity: </span>{item.quantity}x</p>
                                        <p><span>Price: </span>{item.unit_price}$</p>
                                        <p><span>Total Price: </span>{item.unit_price * item.quantity}$  </p>
                                    </div>
                                </div>
                            )
                        })}
                    </section></>
            )}

        </div>


    )
}

export default OrderConfirmation
