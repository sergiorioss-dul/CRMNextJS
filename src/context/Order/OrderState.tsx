import { useContext, useReducer } from "react";
import OrderContext from "./OrderContext";
import OrderReducer from "./OrderReducer";
import { SELECT_CUSTOMER, SELECT_PRODUCT, QUANTITY_PRODUCT, UPDATE_TOTAL } from "@/types";
import { ICustomer, IProduct } from '../../models';


const OrderState = ({ children }: React.PropsWithChildren) => {

    const initialState = {
        customer: {},
        products: [],
        total: 0
    }

    const [state, dispatch] = useReducer(OrderReducer, initialState)

    const addCustomer = (customer: ICustomer) => {
        dispatch({
            type: SELECT_CUSTOMER,
            payload: customer
        })
    }

    const addProduct = (productSelected: any) => {
        let newState;
        if (state.products.length > 0) {
            newState = productSelected.map((product: IProduct) => {
                const newObj = state.products.find((productState: IProduct) => productState.id === product.id)
                return {
                    ...product,
                    ...newObj
                }
            })
        } else {
            newState = productSelected
        }
        dispatch({
            type: SELECT_PRODUCT,
            payload: newState
        })
    }

    const quantityProducts = (product: IProduct) => {
        dispatch({
            type: QUANTITY_PRODUCT,
            payload: product
        })
    }

    const updateTotal = () => {
        dispatch({
            type: UPDATE_TOTAL,
            payload: undefined
        })
    }

    return (
        <OrderContext.Provider
            value={{
                addCustomer,
                addProduct,
                products: state.products,
                quantityProducts,
                updateTotal,
                total: state.total,
                customer: state.customer
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export default OrderState