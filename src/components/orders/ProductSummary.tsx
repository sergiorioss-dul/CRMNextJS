import OrderContext from "@/context/Order/OrderContext"
import { IProductProps } from "@/models"
import { FC, useContext, useEffect, useState } from "react"

const ProductSummary: FC<IProductProps> = ({ product }) => {
    const { name, price } = product
    const [qty, setQty] = useState(0)
    const { quantityProducts, updateTotal } = useContext(OrderContext)
    useEffect(() => {
        updateQuantity()
        updateTotal()
    }, [qty])
    const updateQuantity = () => {
        const newProduct = { ...product, quantity: Number(qty) }
        quantityProducts(newProduct)
    }
    return (
        <div className="md:flex mdj:justify-between md:items-center mt-5">
            <div className="md:w-2/4 mb-2 md:mb-0">
                <p className="text-sm">{name}</p>
                <p>${price}</p>
            </div>
            <input
                onChange={(e) => setQty(e.target.value)}
                type="number"
                placeholder="Quantity"
                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
            />
        </div>
    )
}

export default ProductSummary