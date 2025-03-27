import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import SingleProduct from '../../components/SingleProduct'
import { useNavigate, useParams } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import { IProduct } from '../../models/IProduct'

const UpdateProductSingle = () => {
    const { id } = useParams()
    const Navigate = useNavigate()
    const { UpdateProductByIDHandler, getProductByIDHandler } = useProducts()
    const [changedProduct, setChangedProduct] = useState<IProduct>({
        id: 0,
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        image: "",
        created_at: ""
    })

    useEffect(() => {
        if (!id) return;
        const getProduct = async () => {
            try {
                if (id) {
                    const data = await getProductByIDHandler(Number(id))
                    if (data) {
                        setChangedProduct((prev) => ({
                            ...prev, ...data
                        }))
                        console.log("product: ", data);
                    }

                }

            } catch (error) {
                console.error("Error, couldn't fetch data ", error)
            }
        }

        getProduct()

    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!changedProduct) return;
        const { name, value, type } = e.target;


        setChangedProduct((prev) => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
        }));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!changedProduct || !id) return;

        await UpdateProductByIDHandler(Number(id), changedProduct)

        Navigate("/manage_products")
    }


    return (
        <div>
            <SingleProduct />
            <form onSubmit={handleSubmit} className='formAdmin'>
                <label htmlFor="">Name:
                    <input type="text" name='name' value={changedProduct?.name} onChange={handleChange} />
                </label>
                <label htmlFor="">Description
                    <textarea name='description' value={changedProduct.description} onChange={handleChange} />
                </label>
                <label htmlFor="">Price:
                    <input type="number" name='price' value={changedProduct.price} onChange={handleChange} />
                </label>
                <label htmlFor="">stock
                    <input type="number" name='stock' value={changedProduct.stock} onChange={handleChange} />
                </label>
                <label htmlFor="">Category:
                    <input type="text" name='category' value={changedProduct.category} onChange={handleChange} />
                </label>
                <label htmlFor="">Image URL:
                    <input type="text" name='image' value={changedProduct.image} onChange={handleChange} />
                </label>
                <button type="submit">Update Product</button>
            </form>
        </div>
    )
}

export default UpdateProductSingle
