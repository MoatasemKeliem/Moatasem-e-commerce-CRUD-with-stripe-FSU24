import dotenv from "dotenv";
import express from "express";


dotenv.config();
const app = express();

app.use(express.json())

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

app.post("/stripe/create-checkout-session-embedded", async (req, res) => {
    const [name, price, quantity, id] = req.body.product

    const session = await stripe.checkout.session.create({
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: name
                    },
                    unit_amount: price * 100
                },
                quantity: quantity
            }
        ],
        mode: "payment",
        ui_mode: "embedded",
        return_url: "http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}",
        client_reference_id: id
    })

    res.send({ clientSecret: session.client_secret })
})