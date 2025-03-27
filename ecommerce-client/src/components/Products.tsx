import { useEffect, useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { Link } from 'react-router-dom'
import "../styles/products.css"

import { useAddToCart } from '../hooks/useAddToCart'

const Products = () => {


    const { getProductsHandler, products } = useProducts()
    const { addToCart } = useAddToCart()
    const [searchInput, setSearchInput] = useState("")


    useEffect(() => {
        getProductsHandler()
    }, [])

    const serchProduct = products.filter((prod) => {
        return prod.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
    })

    console.log(products)
    return (
        <div className='page'>
            <h1>Catalog</h1>
            <label htmlFor="" id='SearchInput'>Search Product
                <input type="text" onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
            </label>
            <section className='section'>
                {serchProduct.map((item) => {
                    return (<div key={item.id} className='productDiv'>

                        <img src={item.image} alt={item.name} />
                        <div className='nameNprice'>
                            <h1>{item.name}</h1>
                            <span>{item.price}$</span>
                        </div>
                        <div className='buttonBox'>
                            <Link to={`/product/${item.id}`}>
                                <button>Show Product</button></Link>
                            <button onClick={() => { item && addToCart(item, 1) }}>Add To Cart</button>
                        </div>
                    </div>)
                })}
            </section>
        </div>
    )
}

export default Products


