import { Link } from "react-router-dom"
import OrdersRD from "../../components/OrdersRD"

const ManageOrders = () => {
    return (
        <div>
            <h1>Manage Orders</h1>
            <Link to={"/admin"}><button style={{ backgroundColor: "lightgray" }}>Admin</button></Link>
            <OrdersRD />
        </div>
    )
}

export default ManageOrders
