import { ChangeEvent, FormEvent, useState } from "react"
import { useCustomer } from "../hooks/useCustomer"
import { ICustomer } from "../models/ICustomer"
import { useNavigate } from "react-router-dom"

const CreateCustomerComponent = () => {

    const { createCustomerHandler } = useCustomer()
    const Navigate = useNavigate()
    const [newCustomer, setNewCustomer] = useState<ICustomer>({
        id: 0,
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        street_address: "",
        postal_code: "",
        city: "",
        country: "",
        created_at: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!newCustomer) return;
        const { name, value, type } = e.target;

        setNewCustomer({
            ...newCustomer, [name]: type === "number" ? (value === "" ? "" : Number(value)) : value
        })

    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!newCustomer) return;
        const createCustomer = {
            ...newCustomer,
            phone: String(newCustomer.phone),
            postal_code: String(newCustomer.postal_code)
        }
        await createCustomerHandler(createCustomer)
        Navigate("/manage_customers")
    }




    return (
        <div>
            <form onSubmit={handleSubmit} className="formAdmin">
                <label htmlFor="">First Name:
                    <input type="text" name="firstname" value={newCustomer.firstname} onChange={handleChange} required />
                </label>
                <label htmlFor="">Last Name:
                    <input type="text" name="lastname" value={newCustomer.lastname} onChange={handleChange} required />
                </label>
                <label htmlFor="">email:
                    <input type="email" name="email" value={newCustomer.email} onChange={handleChange} required />
                </label>
                <label htmlFor="">Password:
                    <input type="password" name="password" value={newCustomer.password} onChange={handleChange} required />
                </label>
                <label htmlFor="">Phone:
                    <input type="number" name="phone" value={newCustomer.phone} onChange={handleChange} required />
                </label>
                <label htmlFor="">Street Address:
                    <input type="text" name="street_address" value={newCustomer.street_address} onChange={handleChange} required />
                </label>
                <label htmlFor="">Postal Code:
                    <input type="number" name="postal_code" value={newCustomer.postal_code} onChange={handleChange} required />
                </label>
                <label htmlFor="">City:
                    <input type="text" name="city" value={newCustomer.city} onChange={handleChange} required />
                </label>
                <label htmlFor="">Country:
                    <input type="text" name="country" value={newCustomer.country} onChange={handleChange} required />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateCustomerComponent
