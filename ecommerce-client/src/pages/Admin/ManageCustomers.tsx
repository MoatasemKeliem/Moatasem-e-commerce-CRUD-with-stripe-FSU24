import { Link } from "react-router-dom"
import { useCustomer } from "../../hooks/useCustomer"
import { useEffect } from "react"
import "../../styles/manageOrdersNCustomers.css"

const ManageCustomers = () => {

    const { customer, fetchCustomers, deleteCustomersByIdHandler } = useCustomer()

    useEffect(() => {
        fetchCustomers()
    }, [customer])


    return (
        <div>
            <h1>Manage Customers</h1>
            <Link to={"/admin"}><button style={{ backgroundColor: "lightgray" }}>Admin</button></Link>

            <Link to={"/create_customer"}><button>Create Customer</button></Link>

            <section className="section">
                {customer.map((item) => {
                    return <div key={item.id} className="manageDiv">
                        <h1>{item.firstname} {item.lastname}</h1>
                        <p><span>Id: </span>{item.id}</p>
                        <p><span>Email: </span>{item.email}</p>
                        <p><span>Password:</span> {item.password}</p>
                        <p><span>Phone Number: </span>{item.phone}</p>
                        <p><span>Street Address:</span> {item.street_address}</p>
                        <p><span>Postal Code:</span> {item.postal_code}</p>
                        <p><span>Location:</span> {item.city}, {item.country}</p>
                        <p><span>Created at:</span> {item.created_at}</p>
                        <Link to={`/update_customer/${item.id}`}><button>Update Customer</button></Link>
                        <button onClick={() => { deleteCustomersByIdHandler((Number(item.id))) }}>Delete Customer</button>
                    </div>
                })}</section>
        </div>
    )
}

export default ManageCustomers
