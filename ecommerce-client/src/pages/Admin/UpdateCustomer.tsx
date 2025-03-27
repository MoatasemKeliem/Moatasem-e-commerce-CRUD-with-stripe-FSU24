import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { ICustomer } from "../../models/ICustomer"
import { useCustomer } from "../../hooks/useCustomer"
import { useNavigate, useParams } from "react-router-dom"


const UpdateCustomer = () => {
    const { id } = useParams()
    const Navigate = useNavigate()
    const { UpdatetCustomerByIDHandler, getCustomerByIDHandler } = useCustomer()
    const [updateCustomer, setUpdateCustomer] = useState<ICustomer>({
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

    useEffect(() => {
        if (!id) return;
        const getCustomer = async () => {
            try {
                const data = await getCustomerByIDHandler(Number(id))
                if (data) {
                    setUpdateCustomer((prev) => ({ ...prev, ...data }))
                }
            } catch (error) {
                console.error("Error, couldn't fetch data ", error)
            }

        }

        getCustomer()
    }, [])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!updateCustomer) return
        const { name, value, type } = e.target;

        setUpdateCustomer((prev) => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
        }))

    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!updateCustomer || !id) return

        await UpdatetCustomerByIDHandler(Number(id), updateCustomer)
        Navigate("/manage_customers")
    }



    return (
        <div>
            <h1>Update Customer</h1>
            <form onSubmit={handleSubmit} className="formAdmin">
                <label htmlFor="">First Name:
                    <input type="text" name="firstname" value={updateCustomer.firstname} onChange={handleChange} />
                </label>
                <label htmlFor="">Last Name:
                    <input type="text" name="lastname" value={updateCustomer.lastname} onChange={handleChange} />
                </label>
                <label htmlFor="">email:
                    <input type="email" name="email" value={updateCustomer.email} onChange={handleChange} />
                </label>
                <label htmlFor="">Password:
                    <input type="password" name="password" value={updateCustomer.password} onChange={handleChange} />
                </label>
                <label htmlFor="">Phone:
                    <input type="number" name="phone" value={updateCustomer.phone} onChange={handleChange} />
                </label>
                <label htmlFor="">Street Address:
                    <input type="text" name="address" value={updateCustomer.street_address} onChange={handleChange} />
                </label>
                <label htmlFor="">Postal Code:
                    <input type="number" name="postal_code" value={updateCustomer.postal_code} onChange={handleChange} />
                </label>
                <label htmlFor="">City:
                    <input type="text" name="city" value={updateCustomer.city} onChange={handleChange} />
                </label>
                <label htmlFor="">Country:
                    <input type="text" name="country" value={updateCustomer.country} onChange={handleChange} />
                </label>
                <button type="submit">Update Customer</button>

            </form>
        </div>
    )
}

export default UpdateCustomer
