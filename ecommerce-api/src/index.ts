import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connectDB, db } from "./config/db";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(express.json())
app.use(cors())

// Routes
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)
app.use('/order-items', orderItemRouter)


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

app.post("/stripe/create-checkout-session-hosted", async (req, res) => {


  console.log("This is request Body", req.body);
  console.log("this is order_id", req.body.order_id)
  try {


    const { order_items, order_id } = req.body
    console.log("this is order_id", order_id)



    const line_items = order_items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product_name,
          images: []
        },
        unit_amount: item.unit_price * 100
      },
      quantity: item.quantity

    }))

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:5173/checkout",
      client_reference_id: order_id
    })


    // res.json(session)
    res.json({ checkout_url: session.url, session_id: session.id })
    // res.send({ clientSecret: session.client_secret })
    console.log("This is session", session)
    console.log("This is REQUEST BODY", req.body)
  }
  catch (error) {
    console.error("couldn't post and get data", error)
  }
})


app.post('/stripe/webhook', async (req: Request, res: Response) => {
  const event = req.body;

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      console.log("Payment session completed", session)

      // Update payment info
      const order_ID = session.client_reference_id
      const payment_id = session.id

      try {
        const sql = `UPDATE orders SET payment_id = ?, payment_status = ?, order_status = ? WHERE id = ?`
        const params = [payment_id, "Paid", "Delivered", order_ID]
        const [orderItems] = await db.query(sql, params)

        console.log(`order updated ${order_ID} and payment ID is ${payment_id}`)

        // update product stock


        const stockToReduce = `SELECT product_id, quantity FROM order_items WHERE order_id = ?`
        const [orderItemsTwo] = await db.query(stockToReduce, [order_ID]) as any


        orderItemsTwo.map(async (item: any) => {
          await db.query(`UPDATE products SET stock = stock - ? WHERE id = ? `,
            [item.quantity, item.product_id]
          )
        })


        res.json({ received: true });

      } catch (error) {
        console.error("Error updating order: ", error)


      }


      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
      res.json({ received: true });
  }
});



// Attempt to connect to the database
connectDB()
// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
})
