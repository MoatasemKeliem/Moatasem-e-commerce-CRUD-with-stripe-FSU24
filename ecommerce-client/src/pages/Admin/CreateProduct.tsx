import { ChangeEvent, FormEvent, useState } from "react"
import { IProduct } from "../../models/IProduct"
import { useProducts } from "../../hooks/useProducts"
import { useNavigate } from "react-router-dom"

const CreateProduct = () => {
    const { CreateProductHandler } = useProducts()
    const Navigate = useNavigate()
    const [newProduct, setnewProduct] = useState<IProduct>({
        id: 0,
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        image: "",
        created_at: ""
    })



    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!newProduct) return;
        const { name, value, type } = e.target;

        setnewProduct({
            ...newProduct, [name]: type === "number" ? (value === "" ? "" : Number(value)) : value
        })
    }



    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!newProduct) return;
        console.log(newProduct)
        await CreateProductHandler(newProduct)
        Navigate("/manage_products")
    }

    return (
        <div>
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit} className="formAdmin">
                <label htmlFor="">Name:
                    <input type="text" name="name" value={newProduct.name} onChange={handleChange} />
                </label>
                <label htmlFor="">Description
                    <textarea name="description" value={newProduct.description} onChange={handleChange} />
                </label>
                <label htmlFor="">Price:
                    <input type="number" name="price" value={newProduct.price} onChange={handleChange} />
                </label>
                <label htmlFor="">stock
                    <input type="number" name="stock" value={newProduct.stock} onChange={handleChange} />
                </label>
                <label htmlFor="">Category:
                    <input type="text" name="category" value={newProduct.category} onChange={handleChange} />
                </label>
                <label htmlFor="">Image URL:
                    <input type="text" name="image" value={newProduct.image} onChange={handleChange} />
                </label>
                <button type="submit">Create Product</button>
            </form>
        </div>
    )
}

export default CreateProduct
