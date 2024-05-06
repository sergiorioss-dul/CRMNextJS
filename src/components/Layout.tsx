'use client'

import { FC } from 'react'
import { ILayout } from '../models'
import Sidebar from './Sidebar'
import { usePathname } from 'next/navigation'
import Header from './Header'

const Layout: FC<ILayout> = ({ children }) => {
  const pathname = usePathname()

  return (
    <>
      {
        pathname === '/login' || pathname === '/createAccount' ?
          <div className='bg-gray-800 min-h-screen flex flex-col justify-center'>
            <div>
              {children}
            </div>
          </div>
          :
          <div className="bg-gray-200 min-h-screen">
            <div className='sm:flex min-h-screen'>
              <Sidebar />
              <main className='sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5'>
                <Header />
                {children}
              </main>
            </div>
          </div>
      }
    </>
  )
}

export default Layout
