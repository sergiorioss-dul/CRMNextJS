'use client'

import { useFormik } from "formik"
import Layout from "../components/Layout"
import * as Yup from 'yup'
import { useMutation } from "@apollo/client"
import { useState } from "react"
import { useRouter } from "next/router"
import { NEW_ACCOUNT } from "@/graphql/mutation"


const CreateAccount = () => {

    const [newUser] = useMutation(NEW_ACCOUNT)
    const [message, setMessage] = useState<string>('')
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('The name is required'),
            lastName: Yup.string().required('The lastname is required'),
            email: Yup.string().email('The email is not valid').required('The email is required'),
            password: Yup.string().required('The password is required').min(6, 'Should be more than 6 characters')
        }),
        onSubmit: async ({ name, email, lastName, password }) => {
            try {
                const { data } = await newUser({
                    variables: {
                        input: {
                            email,
                            name,
                            lastName,
                            password
                        }
                    }
                })
                setMessage(`The user ${data.newUser.name} was created`)
                setTimeout(() => {
                    setMessage('')
                    router.push('/login')
                }, 2500)
                console.log(data)

            } catch (error: any) {
                setMessage(error.message)
                setTimeout(() => {
                    setMessage('')
                }, 2500)
            }
        }
    })

    const showMessage = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                {message}
            </div>
        )
    }

    return (
        <>
            <Layout>
                {message && showMessage()}
                <p className="text-center text-2xl text-white font-light">Create a new account</p>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form
                            onSubmit={formik.handleSubmit}
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Name</label>
                                <input id="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" placeholder="Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                {
                                    formik.touched.name && formik.errors.name &&
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                        <p className="font-bold">Error: {formik.errors.name}</p>
                                    </div>
                                }
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Lastname</label>
                                <input id="lastName" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.lastName} type="text" placeholder="Lastname" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                {
                                    formik.touched.lastName && formik.errors.lastName &&
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                        <p className="font-bold">Error: {formik.errors.lastName}</p>
                                    </div>
                                }
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                                <input id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                {
                                    formik.touched.email && formik.errors.email &&
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                        <p className="font-bold">Error: {formik.errors.email}</p>
                                    </div>
                                }
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                                <input id="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                {
                                    formik.touched.password && formik.errors.password &&
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                        <p className="font-bold">Error: {formik.errors.password}</p>
                                    </div>
                                }
                            </div>
                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                                value="Create account"
                            />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default CreateAccount
