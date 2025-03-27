import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import { useCustomer } from "../hooks/useCustomer"
import { ICustomer } from "../models/ICustomer"
import CartInfo from "../components/CartInfo"
import { CartContext } from "../Context/CartContext"
import { Link } from "react-router-dom"
import { useOrder } from "../hooks/useOrder"

const Checkout = () => {

    const { createCustomerHandler, getCustomerByEmailHandler } = useCustomer()
    const { createOrderHandler } = useOrder()
    const { cart } = useContext(CartContext)
    const [validation, setValidation] = useState("")
    const [errorValidation, setErrorValidation] = useState(false)
    const customerInfo = localStorage.getItem("newCustomer")
    const [newCustomer, setNewCustomer] = useState<ICustomer>(customerInfo ? JSON.parse(customerInfo) : {
        id: 0,
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        street_address: "",
        postal_code: "",
        city: "",
        country: "",
        created_at: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!newCustomer) return;

        setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!newCustomer) return;


        if (!newCustomer.firstname) {
            setValidation("Please, enter your first name")
            setErrorValidation(true)
            return;
        } else if (!newCustomer.lastname) {
            setValidation("Please, enter your last name")
            setErrorValidation(true)
            return;
        } else if (!newCustomer.email) {
            setValidation("Please, enter your email")
            setErrorValidation(true)
            return;
        } else if (!newCustomer.phone) {
            setValidation("Please, enter your phone number")
            setErrorValidation(true)
            return;
        } else if (!newCustomer.street_address) {
            setValidation("Please, enter your street address")
            setErrorValidation(true)
            return;
        } else if (!newCustomer.postal_code) {
            setValidation("Please, enter your postal code")
            setErrorValidation(true)
            return;
        } else if (!newCustomer.city) {
            setValidation("Please, enter your city")
            setErrorValidation(true)
            return;
        } else if (!newCustomer.country) {
            setValidation("Please, enter your country")
            setErrorValidation(true)
            return;
        } else {
            setValidation("")
            setErrorValidation(false)
        }
        setValidation("")
        setErrorValidation(false)



        try {
            const data = await getCustomerByEmailHandler(newCustomer.email)

            let customerId: number | undefined

            if (!data || data.length === 0) {
                const createCustomer = {
                    ...newCustomer,
                    phone: String(newCustomer.phone),
                    postal_code: String(newCustomer.postal_code)
                }

                const FirstTimeCustomer = await createCustomerHandler(createCustomer)
                console.log("FirstTimeCustomer Created", FirstTimeCustomer)
                customerId = FirstTimeCustomer.id
                console.log("New customer - Customer ID:", customerId)



            } else {
                console.log("Already a customer", data)
                customerId = data.id

            }


            if (customerId === undefined || customerId === 0) {
                console.log("Invalid customerId, order creation failed")
                return;
            }

            const orderItems = cart.map((item) => ({
                id: null,
                order_id: null,
                product_id: item.product.id,
                product_name: item.product.name,
                quantity: item.quantity,
                unit_price: item.product.price,
                created_at: ""
            }))




            let newOrder = {
                id: null,
                customer_id: customerId,
                total_price: null,
                payment_status: "unpaid",
                payment_id: "",
                order_status: "pending",
                order_items: orderItems
            }
            const orderID = await createOrderHandler(newOrder)




            newOrder = { ...newOrder, id: orderID }
            console.log("Sending order to Stripe:", newOrder);



            const response = await fetch("http://localhost:3000/stripe/create-checkout-session-hosted", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...newOrder,
                    order_id: orderID,
                    order_items: cart.map(item => ({
                        product_name: item.product.name,
                        unit_price: item.product.price,
                        quantity: item.quantity
                    }))
                })
            })
            const stripeData = await response.json()

            const session_id = stripeData.session_id
            newOrder.payment_id = session_id
            newOrder = { ...newOrder, payment_id: session_id }


            console.log("newOrder:", newOrder);
            console.log("this is new Order paymen_id: ", newOrder.payment_id)
            window.location.href = stripeData.checkout_url
            console.log("This is session_id", session_id)


        }
        catch (error) {
            console.log("Error couln't fetch data: ", error)
        }

        localStorage.setItem("newCustomer", JSON.stringify(newCustomer))



        localStorage.removeItem("newCustomer")
        localStorage.removeItem("cart")
        localStorage.clear()
    }

    useEffect(() => {
        localStorage.setItem("newCustomer", JSON.stringify(newCustomer))
    }, [newCustomer])

    console.log("Cart Items", cart)
    return (
        <>
            {cart.length > 0 ?
                (<section>
                    <CartInfo />


                    <form onSubmit={handleSubmit} className="formAdmin">
                        <h2>Your information</h2>
                        {errorValidation && <h3>{validation}</h3>}
                        <label htmlFor="">First Name:
                            <input type="text" name="firstname" value={newCustomer.firstname} onChange={handleChange} />
                        </label>
                        <label htmlFor="">Last Name:
                            <input type="text" name="lastname" value={newCustomer.lastname} onChange={handleChange} />
                        </label>
                        <label htmlFor="">email:
                            <input type="email" name="email" value={newCustomer.email} onChange={handleChange} />
                        </label>
                        <label htmlFor="">Password:
                            <input type="password" name="password" value={newCustomer.password} onChange={handleChange} />
                        </label>
                        <label htmlFor="">Phone:
                            <input type="number" name="phone" value={newCustomer.phone} onChange={handleChange} />
                        </label>
                        <label htmlFor="">Street Address:
                            <input type="text" name="street_address" value={newCustomer.street_address} onChange={handleChange} />
                        </label>
                        <label htmlFor="">Postal Code:
                            <input type="number" name="postal_code" value={newCustomer.postal_code} onChange={handleChange} />
                        </label>
                        <label htmlFor="">City:
                            <input type="text" name="city" value={newCustomer.city} onChange={handleChange} />
                        </label>
                        <label htmlFor="">Country:
                            <input type="text" name="country" value={newCustomer.country} onChange={handleChange} />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </section>) : (
                    <section>
                        <h1>Your Cart is empty</h1>
                        <div>
                            <h2>View our products</h2>
                            <Link to={"/products"}><button>Product Page</button></Link>
                        </div>
                    </section>
                )}
        </>
    )
}

export default Checkout
