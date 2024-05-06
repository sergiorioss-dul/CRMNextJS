import { GET_PRODUCTS } from "@/graphql/querys";
import Layout from "../components/Layout";
import { useQuery } from "@apollo/client";
import Product from "@/components/Product";
import { IProduct } from "@/models";
import Link from "next/link";

export default function Products() {

  const { data, loading } = useQuery(GET_PRODUCTS)
  if (loading) return 'Loading'
  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-light'>Products</h1>
        <Link href='newproduct' className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm">
          New product
        </Link>
        <table className='table-auto shadow-md mt-10 w-full w-lg'>
          <thead className='bg-gray-800'>
            <tr className='text-white'>
              <th className='w-1/5 py-2'>Name</th>
              <th className='w-1/5 py-2'>Stock</th>
              <th className='w-1/5 py-2'>Price</th>
              <th className='w-1/5 py-2'>Remove</th>
              <th className='w-1/5 py-2'>Update</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {
              data.getAllProducts.map((product: IProduct) => (
                <Product
                  key={product.id}
                  {...{ ...product }}
                />
              ))
            }
          </tbody>
        </table>
      </Layout>
    </div>
  )
}
