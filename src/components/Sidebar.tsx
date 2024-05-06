'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { GET_USER } from "@/graphql/querys"
import { useQuery } from "@apollo/client"
import * as React from 'react'

const Sidebar = () => {
    const { data, loading } = useQuery(GET_USER)
    const pathname = usePathname()
    const router = useRouter()
    if (loading) return null
    if (!data) {
        return router.push('/login')
    }
    const { name } = data.getUser

    return (
        <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
            <div>
                <p className='text-white text-2xl font-black'>Welcome {name}</p>
            </div>
            <nav className='mt-5 list-none'>
                <li className={pathname === '/' ? 'bg-blue-800 p-3' : 'p-'}>
                    <Link href="/" className='text-white block'>
                        Customers
                    </Link>
                </li>
                <li className={pathname === '/orders' ? 'bg-blue-800 p-3' : 'p-2'}>
                    <Link href="/orders" className='text-white block'>
                        Orders
                    </Link>
                </li>
                <li className={pathname === '/products' ? 'bg-blue-800 p-3' : 'p-2'}>
                    <Link href="/products" className='text-white block'>
                        Products
                    </Link>
                </li>
            </nav>
            <div className='sm:mt-10'>
                <p className="text-white text-2xl font-black">Stadistics</p>
            </div>
            <nav className='mt-5 list-none'>
                <li className={pathname === '/bestsellers' ? 'bg-blue-800 p-3' : 'p-2'}>
                    <Link href="/bestsellers" className='text-white block'>
                        Best Sellers
                    </Link>
                </li>
                <li className={pathname === '/bestcustomers' ? 'bg-blue-800 p-3' : 'p-2'}>
                    <Link href="/bestcustomers" className='text-white block'>
                        Best Customers
                    </Link>
                </li>
            </nav>
        </aside>
    )
}

export default Sidebar