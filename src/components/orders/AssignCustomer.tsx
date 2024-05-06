import OrderContext from '@/context/Order/OrderContext'
import { GET_CUSTOMERS } from '@/graphql/querys'
import { ICustomer } from '@/models'
import { useQuery } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import Select from 'react-select'


const AssignCustomer = () => {

    const { addCustomer } = useContext(OrderContext)
    const { data, loading } = useQuery(GET_CUSTOMERS)
    const [customer, setCustomer] = useState<ICustomer[]>([])

    useEffect(() => {
        addCustomer(customer)
    }, [customer])

    if (loading) return 'Loading'
    const { getCustomerSellers } = data

    return (
        <>
            <p className='mt-10 y-2 bg-gray-200 border-l-4 border-gray-800 text-gray-700 p-2 text-bg font-bold'>1) Assign a customer to an order: </p>
            <Select
                className='mt-3'
                options={getCustomerSellers}
                onChange={(customer) => setCustomer(customer)}
                getOptionValue={options => options.id}
                getOptionLabel={options => `${options.name} ${options.lastName}`}
            />
        </>
    )
}

export default AssignCustomer