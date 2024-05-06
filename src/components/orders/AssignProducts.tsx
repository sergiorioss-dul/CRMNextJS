import OrderContext from '@/context/Order/OrderContext';
import { GET_PRODUCTS } from '@/graphql/querys';
import { IProduct } from '@/models';
import { useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';


const AssignProducts = () => {

    const { data, loading } = useQuery(GET_PRODUCTS)
    const [products, setProducts] = useState<MultiValue<IProduct[]>>([])
    const { addProduct } = useContext(OrderContext)
    const selectProduct = (product: MultiValue<IProduct[]>) => {
        setProducts(product)
    }
    useEffect(() => {
        addProduct(products)
    }, [products])
    if (loading) return 'Loading'
    const { getAllProducts } = data
    return (
        <>
            <p className='mt-10 y-2 bg-gray-200 border-l-4 border-gray-800 text-gray-700 p-2 text-bg font-bold'>2) Select products</p>
            <Select
                className='mt-3'
                options={getAllProducts}
                onChange={(product) => selectProduct(product)}
                getOptionValue={options => options.id}
                isMulti
                getOptionLabel={(o: IProduct) => `${o.name} - ${o.stock} in stock`}
            />
        </>
    )
}

export default AssignProducts