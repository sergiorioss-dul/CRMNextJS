import Link from "next/link"
import Layout from "../components/Layout"
import { useQuery } from "@apollo/client"
import { GET_ORDERS } from "@/graphql/querys"
import Order from "@/components/Order"
import { IOrder } from "@/models"

const Orders = () => {
  const { data, loading } = useQuery(GET_ORDERS)
  if (loading) return 'Loading'
  if (!data) return null
  const { getOrderByCustomer } = data
  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-light'>Orders</h1>
        <Link href='neworder' className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm">
          New Order
        </Link>
        {
          getOrderByCustomer.length === 0 ? <p className="mt-5 text-center text-2xl">There aren´t orders</p>
            : getOrderByCustomer.map(({ id, total, customer, state, order }: IOrder) => (<Order key={id} {...{ id, total, customer, state, order }} />)
            )
        }
      </Layout>
    </div>
  )
}

export default Orders