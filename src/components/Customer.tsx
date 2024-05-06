import { ICustomer } from "@/models"
import Swal from "sweetalert2"
import { FC } from "react"
import { useMutation } from "@apollo/client"
import { DELETE_CUSTOMER } from "@/graphql/mutation"
import { GET_CUSTOMERS } from "@/graphql/querys"
import Router from "next/router"

const Customer: FC<ICustomer> = ({ id, name, lastName, company, email }) => {

    const [deleteCustomer] = useMutation(DELETE_CUSTOMER, {
        async update(cache) {
            const { getCustomerSellers } = cache.readQuery<any>({
                query: GET_CUSTOMERS
            })
            await cache.writeQuery({
                query: GET_CUSTOMERS,
                data: {
                    getCustomerSellers: getCustomerSellers.filter((currentCustomer: any) => currentCustomer.id !== id)
                }
            })
        }
    })

    const updateCustomer = (id?: string) => {
        Router.push({
            pathname: '/updatecustomer/[id]',
            query: {
                id
            }
        })
    }

    const _deleteCustomer = (id?: string) => {
        if (!id) return
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
                    const { data } = await deleteCustomer({
                        variables: {
                            deleteCustomerId: id
                        }
                    })
                    Swal.fire({
                        title: "Deleted!",
                        text: data.deleteCustomer,
                        icon: "success"
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        });
    }

    return (
        <tr key={id}>
            <td className='border px-4 py-2'>{name} {lastName}</td>
            <td className='border px-4 py-2'>{company}</td>
            <td className='border px-4 py-2'>{email}</td>
            <td className='border px-4 py-2'>
                <button
                    onClick={() => _deleteCustomer(id)}
                    type="button"
                    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                >Remove
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </button>
            </td>
            <td className='border px-4 py-2'>
                <button
                    onClick={() => updateCustomer(id)}
                    type="button"
                    className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                >Update
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                </button>
            </td>
        </tr>
    )
}

export default Customer