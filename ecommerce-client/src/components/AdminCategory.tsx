import { Link } from 'react-router-dom'

const AdminCategory = () => {

    return (
        <section className='AdminPage'>
            <div className='AdminDiv'>
                <h1>Welcome Admin</h1>
                <Link to={"/manage_products"}><button className='AdminPageButton'>Manage Products</button></Link>
                <Link to={"/manage_orders"}><button className='AdminPageButton'>Manage Orders</button></Link>
                <Link to={"/manage_customers"}><button className='AdminPageButton'>Manage Customers</button></Link>
            </div></section>
    )
}

export default AdminCategory
