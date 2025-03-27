import { Link } from "react-router-dom"
import AdminProducts from "../../components/AdminProducts"
import "../../styles/products.css"


const ManageProducts = () => {
    return (
        <div>
            <h1>Manage Products</h1>
            <Link to={"/admin"}><button style={{ backgroundColor: "lightgray" }}>Admin</button></Link>
            <AdminProducts />
        </div>
    )
}

export default ManageProducts
