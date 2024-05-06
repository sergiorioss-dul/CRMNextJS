import Layout from "@/components/Layout"
import { NEW_PRODUCT } from "@/graphql/mutation"
import { GET_PRODUCTS } from "@/graphql/querys"
import { useMutation } from "@apollo/client"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import Swal from "sweetalert2"
import * as Yup from 'yup'

const NewProduct = () => {

    const [newProduct] = useMutation(NEW_PRODUCT, {
        update(cache, { data: { newProduct } }) {
            const { getAllProducts } = cache.readQuery<any>({ query: GET_PRODUCTS })
            cache.writeQuery({
                query: GET_PRODUCTS,
                data: {
                    getAllProducts: [...getAllProducts, newProduct]
                }
            })
        }
    })
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            name: '',
            stock: '',
            price: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('This field is required'),
            stock: Yup.number().required('This field is required').positive('Invalid Number').integer('Invalid Number'),
            price: Yup.number().required('This field is required').positive('Invalid Number')
        }),
        onSubmit: async (values) => {
            try {
                const { data } = await newProduct({
                    variables: {
                        input: values
                    }
                })
                Swal.fire('Created', 'The product was created', 'success')
                router.push('/products')
            } catch (error) {
                console.log(error)
            }
        }
    })
    return (
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>Create a new product</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        onSubmit={formik.handleSubmit}
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                type="text"
                                placeholder="Name"
                            />
                            {
                                formik.touched.name && formik.errors.name &&
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                    <p className="font-bold">Error: {formik.errors.name}</p>
                                </div>
                            }
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Stock</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="stock"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.stock}
                                type="number"
                                placeholder="Stock"
                            />
                            {
                                formik.touched.stock && formik.errors.stock &&
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                    <p className="font-bold">Error: {formik.errors.stock}</p>
                                </div>
                            }
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Price</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="price"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                                type="number"
                                placeholder="Price"
                            />
                            {
                                formik.touched.price && formik.errors.price &&
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                    <p className="font-bold">Error: {formik.errors.price}</p>
                                </div>
                            }
                        </div>
                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="SUBMIT"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default NewProduct