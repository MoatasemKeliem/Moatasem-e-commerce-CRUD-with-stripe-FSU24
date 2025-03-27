import { Link } from "react-router-dom"
import { useProducts } from "../hooks/useProducts"
import { useEffect, useState } from "react"

const AdminProducts = () => {

    const { getProductsHandler, products, DeleteProductByIDHandler } = useProducts()

    const [searchInput, setSearchInput] = useState("")


    useEffect(() => {
        getProductsHandler()
    }, [products])


    const searchProduct = products.filter((prod) => {
        return prod.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
    })

    return (
        <div className="page">
            <form action="">
                <label htmlFor="">Search Product:
                    <input type="text" onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
                </label>
            </form>
            <Link to={"/create_product"}><button>Create Product</button></Link>
            <section className="section">
                {searchProduct.map((item) => {
                    return (<div key={item.id} className="productDiv">
                        <h1>{item.name}</h1>
                        <img src={item.image} alt={item.name} />
                        <div></div>
                        <span>Price: {item.price}$</span>
                        <span>Stock: {item.stock}</span>

                        <Link to={`/update_product/${item.id}`}>
                            <button>update Product</button></Link>
                        <button onClick={() => { DeleteProductByIDHandler(Number(item.id)) }}>Delete Product</button>
                    </div>)
                })}</section>
        </div>
    )
}

export default AdminProducts

