import Layout from "@/components/Layout"
import { UPDATE_PRODUCT } from "@/graphql/mutation"
import { GET_PRODUCT } from "@/graphql/querys"
import { IProduct } from "@/models"
import { useMutation, useQuery } from "@apollo/client"
import { Formik } from "formik"
import { useRouter } from "next/router"
import Swal from "sweetalert2"
import * as Yup from 'yup'

const UpdateProduct = () => {

    const router = useRouter()
    const { query: { id } } = router
    const [updateProduct] = useMutation(UPDATE_PRODUCT)
    const { data, loading, error } = useQuery(GET_PRODUCT, {
        variables: {
            getProductId: id
        }
    })
    if (loading) return 'Loading'
    if (!data) {
        return '404'
    }
    const { getProduct } = data
    const schemaValidation = Yup.object({
        name: Yup.string().required('This field is required'),
        stock: Yup.number().required('This field is required').positive('Invalid Number').integer('Invalid Number'),
        price: Yup.number().required('This field is required').positive('Invalid Number')
    })

    const _onSubmit = async (values: IProduct) => {
        try {
            await updateProduct({
                variables: {
                    updateProductId: id,
                    input: values
                }
            })
            router.push('/products')
            Swal.fire(
                'Updated',
                'The Product was updated',
                'success'
            )
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>Update Product</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        enableReinitialize
                        initialValues={getProduct}
                        validationSchema={schemaValidation}
                        onSubmit={(values) => _onSubmit(values)}
                    >
                        {
                            props => {
                                return (

                                    <form
                                        onSubmit={props.handleSubmit}
                                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="name"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.name}
                                                type="text"
                                                placeholder="Name"
                                            />
                                            {
                                                props.touched.name && props.errors.name &&
                                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                                    <p className="font-bold">Error: {props.errors.name}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Stock</label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="stock"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.stock}
                                                type="number"
                                                placeholder="Stock"
                                            />
                                            {
                                                props.touched.stock && props.errors.stock &&
                                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                                    <p className="font-bold">Error: {props.errors.stock}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Price</label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="price"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.price}
                                                type="number"
                                                placeholder="Price"
                                            />
                                            {
                                                props.touched.price && props.errors.price &&
                                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                                    <p className="font-bold">Error: {props.errors.price}</p>
                                                </div>
                                            }
                                        </div>
                                        <input
                                            type="submit"
                                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                            value="Update"
                                        />
                                    </form>
                                )
                            }
                        }
                    </Formik>

                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct