import Layout from "@/components/Layout"
import AssignCustomer from "@/components/orders/AssignCustomer"
import AssignProducts from "@/components/orders/AssignProducts"
import FinalOrder from "@/components/orders/FinalOrder"
import Total from "@/components/orders/Total"
import OrderContext from "@/context/Order/OrderContext"
import { NEW_ORDER } from "@/graphql/mutation"
import { GET_ORDERS } from "@/graphql/querys"
import { IProduct } from "@/models"
import { showMessage } from "@/utils"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import Swal from "sweetalert2"


const NewOrder = () => {
    const [message, setMessage] = useState(null)
    const { customer, products, total } = useContext(OrderContext);
    const [newOrder] = useMutation(NEW_ORDER, {
        update(cache, { data: { newOrder } }) {
            const { getOrderByCustomer } = cache.readQuery({
                query: GET_ORDERS,
            })
            cache.writeQuery({
                query: GET_ORDERS,
                data: {
                    getOrderByCustomer: [...getOrderByCustomer, newOrder]
                }
            })
        }
    })
    const router = useRouter()

    const validateOrder = () => {
        return !products.every((product: IProduct) => product.quantity > 0) || total == 0 || customer.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
    }

    const createOrder = async () => {

        const order = products.map(({ stock, __typename, newObj, ...product }: IProduct) => product)
        try {
            const { data } = await newOrder({
                variables: {
                    newOrder: {
                        customer: customer.id,
                        total,
                        order
                    }
                }
            })
            router.push('/orders')
            Swal.fire(
                'Success',
                'The order was added',
                'success'
            )
        } catch (error) {
            setMessage(error.message)
            setTimeout(() => {
                setMessage('')
            }, 5500)
        }
    }


    return (
        <Layout>
            <h1>Create order</h1>
            {message && showMessage(message)}
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AssignCustomer />
                    <AssignProducts />
                    <FinalOrder />
                    <Total />
                    <button
                        onClick={createOrder}
                        type="button"
                        className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validateOrder()}`}>
                        Create order
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default NewOrder