import gql from 'graphql-tag'
import Layout from '../components/Layout'
import { useQuery } from '@apollo/client'
import { ICustomer } from '@/models'
import { useRouter } from 'next/router'
import client from '@/config/apollo'
import Link from 'next/link'
import { GET_CUSTOMERS } from '@/graphql/querys'
import Customer from '@/components/Customer'

const Index = () => {
  const router = useRouter()
  const { data, loading } = useQuery(GET_CUSTOMERS)
  if (loading) return 'Loading'
  if (!data) {
    client.clearStore()
    router.push('/login')
    return <p>Loading...</p>
  }
  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-light'>Customers</h1>
        <Link href="/newCustomer" className='bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center'>
          Add New Customer
        </Link>
        <div className='overflow-x-scroll'>
          <table className='table-auto shadow-md mt-10 w-full w-lg'>
            <thead className='bg-gray-800'>
              <tr className='text-white'>
                <th className='w-1/5 py-2'>Name</th>
                <th className='w-1/5 py-2'>Company</th>
                <th className='w-1/5 py-2'>Email</th>
                <th className='w-1/5 py-2'>Remove</th>
                <th className='w-1/5 py-2'>Update</th>

              </tr>
            </thead>
            <tbody className='bg-white'>
              {
                data.getCustomerSellers.map((customer: ICustomer) => (
                  <Customer key={customer.id} {...{ ...customer }} />
                ))
              }
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  )
}

export default Index