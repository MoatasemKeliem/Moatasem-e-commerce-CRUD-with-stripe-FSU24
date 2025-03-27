import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { IOrder } from "../../models/IOrder"
import { useNavigate, useParams } from "react-router-dom"
import { useOrder } from "../../hooks/useOrder"
import "../../styles/manageOrdersNCustomers.css"
import useOrderItem from "../../hooks/useOrderItem"
import { IOrderItem } from "../../models/IOrderItem"




const OrderUpdate = () => {
    const { id } = useParams()
    const Navigate = useNavigate()
    const { UpdateOrderByIdHandler, getOrderByIdHandler } = useOrder()
    const { UpdateOrderItemsByIdHandler, DeleteOrderItemByIdHandler } = useOrderItem()
    const [updatedOrder, setUpdatedOrder] = useState<IOrder>({
        id: 0,
        customer_id: 0,
        total_price: 0,
        payment_status: "",
        payment_id: "",
        order_status: "",
        created_at: "",
        customer_firstname: "My name",
        customer_lastname: "My last name",
        customer_email: "email@eamil.com",
        customer_phone: "",
        customer_street_address: "",
        customer_postal_code: "",
        customer_city: "",
        customer_country: "",
        customers_created_at: "",
        order_items: []
    })


    useEffect(() => {
        if (!id) return;
        const getOrder = async () => {
            try {
                if (id) {
                    const data = await getOrderByIdHandler(Number(id))
                    console.log("Fetched Order :", data);
                    if (data) {
                        setUpdatedOrder(data)
                    }
                }
            } catch (error) {
                console.error("Error, couldn't fetch data ", error)
            }

        }
        getOrder()
    }, [])

    console.log("IS RUNNING")

    useEffect(() => {
        console.log("Updated Order: ", updatedOrder);
    }, [updatedOrder, updatedOrder.order_items]);




    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!updatedOrder) return;
        const { name, value } = e.target;

        setUpdatedOrder((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>, itemId: number) => {
        setUpdatedOrder((prev) => ({
            ...prev,
            order_items: prev.order_items.map((item) => item.id === itemId ? { ...item, quantity: Number(e.target.value) } : item)
        }))
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!updatedOrder || !id) return;
        console.log("Updated Order Items:", updatedOrder.order_items);
        try {
            await UpdateOrderByIdHandler(Number(id), updatedOrder)
            Navigate("/manage_orders")
        } catch (error) {
            console.error("Couldn't update order", error)
            throw new Error()
        }

    }



    const handleSubmitQuantity = async (id: number, payload: IOrderItem) => {
        try {
            await UpdateOrderItemsByIdHandler(id, payload)
        } catch (error) {
            console.error("Couldn't update order", error)
            throw new Error()
        }

    }


    return (
        <div key={updatedOrder?.id}>
            <h1>Update Order</h1>
            <section className="newSection">

                <div key={updatedOrder?.id} className="manageDiv">
                    <h1>Name: {updatedOrder?.customer_firstname} {updatedOrder?.customer_lastname}</h1>
                    <p><span> Id:</span> {updatedOrder?.customer_id}</p>
                    <p><span>Email:</span> {updatedOrder?.customer_email}</p>
                    <p><span>Phone Number: </span>{updatedOrder?.customer_phone}</p>
                    <p><span>Street Address: </span>{updatedOrder?.customer_street_address}</p>
                    <p><span>Postal Code:</span> {updatedOrder?.customer_postal_code}</p>
                    <p><span>Location:</span> {updatedOrder?.customer_city}, {updatedOrder?.customer_country}</p>
                    <p><span>Created at:</span> {updatedOrder?.created_at}</p>
                </div>

                <div key={updatedOrder?.payment_id} className="manageDiv">
                    <h1>Order Information</h1>
                    <p><span>Payment Status:</span> {updatedOrder?.payment_status} </p>
                    <p><span>Payment ID:</span> {updatedOrder?.payment_id} </p>
                    <p><span>Order Status:</span> {updatedOrder?.order_status}</p>
                    <p><span>Total Price: </span>{updatedOrder?.total_price}</p>
                    <p><span>Order Date:</span> {updatedOrder?.created_at}</p>
                </div>

            </section>

            <form onSubmit={handleSubmit} className="formAdmin" id="formSection">
                <div id="PaymentStatusUpdate">
                    <label htmlFor="">Payemnt Status:
                        <select name="payment_status" id="" value={updatedOrder.payment_status} onChange={handleChange}>Payment Status:
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Refunded">Refunded</option>
                        </select></label>
                    <label htmlFor="">Payment ID:
                        <input type="text" name="payment_id" value={updatedOrder.payment_id} onChange={handleChange} />
                    </label>
                    <label htmlFor="">Order Status:
                        <select name="order_status" id="" value={updatedOrder.order_status} onChange={handleChange}>Order Status:
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Returned">Returned</option>
                        </select></label>
                    <button type="submit">Save Order Status</button>
                </div>


                <section className="section" id="orderItemsdiv">
                    <h3>Order Items</h3>
                    {updatedOrder.order_items && updatedOrder.order_items.length > 0 ? (updatedOrder.order_items.map((order) => (
                        <div key={order?.id}>
                            <p>{order?.product_name}</p>
                            <p>Quantity: {order?.quantity}</p>
                            <input type="number" name="quantity" id="quantity" value={order?.quantity} onChange={(e) => handleChangeQuantity(e, Number(order?.id))} />
                            <button onClick={() => handleSubmitQuantity(Number(order?.id), order)} id="orderItemsButtons">Update quantity</button>
                            <button onClick={() => DeleteOrderItemByIdHandler(Number(order?.id))} id="orderItemsButtons">Delete</button>
                        </div>
                    ))) : <h3>No Orders</h3>}

                </section>
            </form>
        </div>
    )
}

export default OrderUpdate
