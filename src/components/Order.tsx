import { REMOVE_ORDER, UPDATE_ORDER } from "@/graphql/mutation"
import { GET_ORDERS_ONLY_IDS } from "@/graphql/querys"
import { IOrder, OrderType } from "@/models"
import { useMutation } from "@apollo/client"
import { FC, useEffect, useState } from "react"
import Swal from "sweetalert2"

const Order: FC<IOrder> = ({ id, customer: { name, lastName, email, cellPhone }, state, total, order, customer }) => {
    const [stateOrder, setStateOrder] = useState(state)
    const [classOrder, setClassOrder] = useState<string>('')
    const [updateOrder] = useMutation(UPDATE_ORDER)
    const [removeOrder] = useMutation(REMOVE_ORDER, {
        update(cache) {
            const { getOrderByCustomer } = cache.readQuery({
                query: GET_ORDERS_ONLY_IDS
            })
            cache.writeQuery({
                query: GET_ORDERS_ONLY_IDS,
                data: {
                    getOrderByCustomer: getOrderByCustomer.filter((order) => order.id !== id)
                }
            })
        }
    })

    useEffect(() => {
        if (stateOrder) {
            setStateOrder(stateOrder)
        }
        handlerClassOrder()
    }, [stateOrder])

    const handlerClassOrder = () => {
        if (state === 'PENDING') {
            setClassOrder('border-yellow-500')
        } else if (state === 'COMPLETED') {
            setClassOrder('border-green-500')
        } else {
            setClassOrder('border-red-500')
        }
    }

    const changeState = async (newState: string) => {
        try {
            const { data } = await updateOrder({
                variables: {
                    updateOrderId: id,
                    input: {
                        state: newState,
                        customer: customer.id
                    }
                }
            })
            setStateOrder(data.updateOrder.state)
        } catch (error) {
            console.log(error)
        }
    }

    const _removeOrder = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await removeOrder({
                        variables: {
                            removeOrderId: id
                        }
                    })
                    Swal.fire({
                        title: "Deleted!",
                        text: data.removeOrder,
                        icon: "success"
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    return (
        <div className={` ${classOrder} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>
            <div>
                <p className="font-bold text-gray-800"> Cutomer: {name} {lastName}</p>
                {
                    email && <p className="flex items-center my-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>{email}
                    </p>
                }
                {
                    cellPhone && <p className="flex items-center my-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>{cellPhone}
                    </p>
                }
                <h2 className="text-gray-800 font-bold mt-10">Order status:</h2>
                <select
                    onChange={e => changeState(e.target.value)}
                    value={stateOrder}
                    className="mt-2 appearence-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tigth focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold">
                    <option value="COMPLETED">Completed</option>
                    <option value="PENDING">Pending</option>
                    <option value="REJECTED">Rejected</option>
                </select>
            </div>
            <div>
                <h2 className="text-gray-800 font-bold mt-2">Products:</h2>
                {
                    order.map(({ quantity, name, id }: OrderType) => (
                        <div key={id} className="mt-4">
                            <p className="text-sm text-gray-600">Product: {name}</p>
                            <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                        </div>
                    ))
                }
                <p className="text-gray-800 mt-3 font-bold">
                    Total: <span className="font-light">${total}</span>
                </p>
                <button onClick={() => _removeOrder()} className="flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs font-bold">
                    Delete
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>
        </div >
    )
}

export default Order
