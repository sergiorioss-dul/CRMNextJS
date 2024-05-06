import { REMOVE_PRODUCT } from "@/graphql/mutation"
import { IProduct } from "@/models"
import { useMutation } from "@apollo/client"
import Swal from "sweetalert2"
import { GET_PRODUCTS } from '../graphql/querys';
import Router from "next/router";

const Product = (props: IProduct) => {
    const { name, stock, price, id } = props

    const [removeProduct] = useMutation(REMOVE_PRODUCT, {
        update(cache) {
            const { getAllProducts } = cache.readQuery<any>({
                query: GET_PRODUCTS
            })
            cache.writeQuery({
                query: GET_PRODUCTS,
                data: {
                    getAllProducts: getAllProducts.filter((product: IProduct) => product.id !== id)
                }
            })
        }
    })

    const updateProduct = () => {
        Router.push({
            pathname: '/updateproduct/[id]',
            query: {
                id
            }
        })
    }

    const deleteProduct = (id: String) => {
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
                    const { data } = await removeProduct({
                        variables: {
                            removeProductId: id
                        }
                    })
                    Swal.fire({
                        title: "Deleted!",
                        text: data.removeProduct,
                        icon: "success"
                    })
                } catch (error: any) {
                    Swal.fire({
                        title: "Error!",
                        text: error.message,
                        icon: "error"
                    })
                    console.log(error)
                }
            }
        });
    }

    return (
        <tr key={id}>
            <td className='border px-4 py-2'>{name}</td>
            <td className='border px-4 py-2'>{stock} in stock</td>
            <td className='border px-4 py-2'>${price}</td>
            <td className='border px-4 py-2'>
                <button
                    onClick={() => deleteProduct(id)}
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
                    onClick={() => updateProduct()}
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

export default Product