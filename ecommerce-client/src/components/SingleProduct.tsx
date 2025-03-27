import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { IProduct } from '../models/IProduct'
import { useAddToCart } from '../hooks/useAddToCart'
import "../styles/SingleProduct.css"

const SingleProduct = () => {

    const { getProductByIDHandler } = useProducts()
    const { id } = useParams()
    const [product, setProduct] = useState<IProduct | null>(null)

    const { addToCart } = useAddToCart()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (id) {
                    const data = await getProductByIDHandler(Number(id))
                    setProduct(data)
                }

            } catch (error) {
                console.error("Error, couldn't fetch data ", error)
            }
        }

        fetchProduct()
    }, [id, getProductByIDHandler])



    return (
        <div className='singleProductdiv'>
            <img src={product?.image} alt={product?.name} id='productImg' />
            <div id='productInfo'>
                <h1>{product?.name}</h1>
                <p>{product?.description}</p>
                <div id='priceNstock'>
                    <span>Price: ${product?.price}</span>
                    <span>Stock: {product?.stock}</span>
                </div>

                <button onClick={() => { product && addToCart(product, 1) }}>Add To Cart</button>
            </div>
        </div>
    )
}

export default SingleProduct
