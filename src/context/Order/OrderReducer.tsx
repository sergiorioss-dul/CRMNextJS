import { IState } from "@/models";
import { SELECT_CUSTOMER, SELECT_PRODUCT, QUANTITY_PRODUCT, UPDATE_TOTAL } from "@/types";

export default (state: IState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case SELECT_CUSTOMER:
            return {
                ...state,
                customer: action.payload
            }
        case SELECT_PRODUCT:
            return {
                ...state,
                products: action.payload
            }
        case QUANTITY_PRODUCT:
            return {
                ...state,
                products: state.products.map((p => p.id === action.payload.id ? p = action.payload : p))
            }
        case UPDATE_TOTAL:
            return {
                ...state,
                total: state.products.reduce((newTotal, product) => newTotal += product.price * product.quantity, 0)
            }
        default:
            return state
    }
}