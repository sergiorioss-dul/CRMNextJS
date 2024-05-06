import Layout from "@/components/Layout"
import * as Yup from 'yup'
import { GET_CUSTOMER, GET_CUSTOMERS } from "@/graphql/querys"
import { useMutation, useQuery } from "@apollo/client"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { UPDATE_CUSTOMER } from "@/graphql/mutation"
import { ICustomer } from "@/models"
import Swal from "sweetalert2"

const UpdateCustomer = () => {
    const router = useRouter()
    const { query: { id } } = router
    const { data, loading } = useQuery(GET_CUSTOMER, {
        variables: {
            getCustomerId: id
        }
    })
    const [updateCustomer] = useMutation(UPDATE_CUSTOMER, {
        update(cache, { data: { updateCustomer } }) {
            const { getCustomerSellers } = cache.readQuery<any>({
                query: GET_CUSTOMERS
            })
            const updatedCustomers = getCustomerSellers.map((customer: any) => customer.id === id ? updateCustomer : customer)
            cache.writeQuery({
                query: GET_CUSTOMERS,
                data: {
                    getCustomerSellers: updatedCustomers
                }
            })
            cache.writeQuery({
                query: GET_CUSTOMER,
                variables: {
                    getCustomerId: id
                },
                data: {
                    getCustomer: updateCustomer
                }
            })
        }
    })

    const schemaValidation = Yup.object({
        name: Yup.string().required('The name is required'),
        lastName: Yup.string().required('The lastname is required'),
        email: Yup.string().email('The email is not valid').required('The email is required'),
        company: Yup.string().required('The company is required')
    })

    if (loading || !data) return 'Loading'
    const { getCustomer } = data

    const handlerUpdateCustomer = async (values: ICustomer) => {
        const { name, lastName, email, cellPhone, company } = values

        try {
            const { data } = await updateCustomer({
                variables: {
                    updateCustomerId: id,
                    input: {
                        name,
                        lastName,
                        email,
                        cellPhone,
                        company
                    }
                }
            })
            router.push('/')
            Swal.fire(
                'Updated!',
                'The client was updated',
                'success'
            )
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Update Customer</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        onSubmit={(values) => {
                            handlerUpdateCustomer(values)
                        }}
                        validationSchema={schemaValidation}
                        enableReinitialize
                        initialValues={getCustomer}
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
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Lastname</label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="lastName"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.lastName}
                                                type="text"
                                                placeholder="Lastname"
                                            />
                                            {
                                                props.touched.lastName && props.errors.lastName &&
                                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                                    <p className="font-bold">Error: {props.errors.lastName}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="email"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.email}
                                                type="email"
                                                placeholder="Email"
                                            />
                                            {
                                                props.touched.email && props.errors.email &&
                                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                                    <p className="font-bold">Error: {props.errors.email}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">Company</label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="company"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.company}
                                                type="text"
                                                placeholder="Company"
                                            />
                                            {
                                                props.touched.company && props.errors.company &&
                                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                                    <p className="font-bold">Error: {props.errors.company}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cellPhone">Cellphone</label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="cellPhone"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.cellPhone}
                                                type="tel"
                                                placeholder="CellPhone"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                        >Update</button>
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
export default UpdateCustomer
