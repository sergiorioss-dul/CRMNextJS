import { useFormik } from "formik"
import Layout from "../components/Layout"
import * as Yup from 'yup'
import { useMutation } from "@apollo/client"
import { useState } from "react"
import { useRouter } from "next/router"
import { AUTH_USER } from "@/graphql/mutation"
import { showMessage } from "@/utils"

const Login = () => {

    const router = useRouter()
    const [authUser] = useMutation(AUTH_USER)
    const [message, setMessage] = useState<string>('')
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('This email is not valid').required('The email field is required'),
            password: Yup.string().required('The password field is required')
        }),
        onSubmit: async ({ email, password }) => {
            localStorage.removeItem('token')
            try {
                const { data } = await authUser({
                    variables: {
                        "input": {
                            email,
                            password
                        }
                    }
                })
                setMessage('Authenticating')
                setTimeout(() => {
                    const { token } = data.authUser
                    localStorage.setItem('token', token)
                }, 1000)
                setTimeout(() => {
                    setMessage('')
                    router.push('/')
                }, 2000)

            } catch (error: any) {
                setMessage(error.message)
                setTimeout(() => {
                    setMessage('')
                }, 1500)
            }
        }
    })


    return (
        <>
            <Layout>
                {message && showMessage(message)}
                <p className="text-center text-2xl text-white font-light">Login</p>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                                <input id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                {
                                    formik.touched.email && formik.errors.email &&
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                        <p className="font-bold">Error: {formik.errors.email}</p>
                                    </div>
                                }
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                                <input id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
                                value="Log in"
                            />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Login
