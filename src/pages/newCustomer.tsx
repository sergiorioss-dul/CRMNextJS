import Layout from "@/components/Layout"
import { NEW_CUSTOMER } from "@/graphql/mutation"
import { GET_CUSTOMERS } from "@/graphql/querys"
import { ICustomer } from "@/models"
import { showMessage } from "@/utils"
import { useMutation } from "@apollo/client"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import { useState } from "react"
import * as Yup from 'yup'

const NewCustomer = () => {

    const [message, setMessage] = useState<string>('')
    const [newCustomer] = useMutation(NEW_CUSTOMER, {
        update(cache, { data: { addNewCustomer } }) {
            const { getCustomerSellers } = cache.readQuery<any>({ query: GET_CUSTOMERS })
            cache.writeQuery({
                query: GET_CUSTOMERS,
                data: {
                    getCustomerSellers: [...getCustomerSellers, addNewCustomer]
                }
            })
        }
    })
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            company: '',
            email: '',
            cellPhone: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('The name is required'),
            lastName: Yup.string().required('The Lastname is required'),
            company: Yup.string().required('The company is required'),
            email: Yup.string().email().required('The email is required'),
        }),
        onSubmit: async ({ name, lastName, company, email, cellPhone }: ICustomer) => {
            try {
                await newCustomer({
                    variables: {
                        input: {
                            name,
                            lastName,
                            company,
                            email,
                            cellPhone
                        }
                    }
                })
                router.push('/')
            } catch (error: any) {
                setMessage(error.message)
                setTimeout(() => {
                    setMessage('')
                }, 2000)
            }
        }
    })
    return (
        <Layout>
            {message && showMessage(message)}
            <h1 className="text-2xl text-gray-800 font-light">New Customer</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form onSubmit={formik.handleSubmit} className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Lastname</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="lastName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                                type="text"
                                placeholder="Lastname"
                            />
                            {
                                formik.touched.lastName && formik.errors.lastName &&
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                    <p className="font-bold">Error: {formik.errors.lastName}</p>
                                </div>
                            }
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                type="email"
                                placeholder="Email"
                            />
                            {
                                formik.touched.email && formik.errors.email &&
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                    <p className="font-bold">Error: {formik.errors.email}</p>
                                </div>
                            }
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">Company</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="company"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.company}
                                type="text"
                                placeholder="Company"
                            />
                            {
                                formik.touched.company && formik.errors.company &&
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                    <p className="font-bold">Error: {formik.errors.company}</p>
                                </div>
                            }
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cellPhone">Cellphone</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="cellPhone"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.cellPhone}
                                type="tel"
                                placeholder="CellPhone"
                            />
                        </div>
                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Register"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default NewCustomer
