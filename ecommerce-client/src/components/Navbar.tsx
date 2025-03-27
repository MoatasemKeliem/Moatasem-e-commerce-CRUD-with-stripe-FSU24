import { NavLink } from 'react-router-dom'
import "../styles/navbar.css"
import logo from "../assets/original-dbbc84c08bd6b4b49fc97827fa5be468-removebg-preview.png"
import { useContext } from 'react'
import { CartContext } from '../Context/CartContext'

const Navbar = () => {

    const { cart } = useContext(CartContext)

    const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0)

    return (
        <nav>
            <a href={"/"} className={"navlink"} >
                <img src={logo} alt="Logo goes here" id='logo' /></a>

            <h2 id='brand'>Brand</h2>
            <ul className='listNav'>
                <li>
                    <NavLink className={"navlink"} to={"/"}>Home</NavLink>
                </li>
                <li>
                    <NavLink className={"navlink"} to={"/products"}>Products</NavLink>
                </li><li>
                    <NavLink className={"navlink"} to={"/admin"}>Admin</NavLink>
                </li><li>
                    <NavLink className={"navlink"} to={"/cart"}>Cart
                        <span className='cartitems'>{itemsInCart}</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
