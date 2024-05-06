import OrderContext from '@/context/Order/OrderContext';
import { useContext } from 'react';
import ProductSummary from './ProductSummary';
import { IProduct } from '@/models';

const FinalOrder = () => {
    const { products } = useContext(OrderContext);
    return (
        <>
            <p className="mt-10 y-2 bg-gray-200 border-l-4 border-gray-800 text-gray-700 p-2 text-bg font-bold">
                3) Select quantities
            </p>
            {products.length > 0 ? (
                <>
                    {products.map((product: IProduct) => (
                        <ProductSummary key={product.id} {...{ product }} />
                    ))}
                </>
            ) : (
                <p className="mt-5 text-sm">There are not products</p>
            )}
        </>
    );
};

export default FinalOrder;
