export interface ILayout {
    children: any
}

export interface ICustomer {
    id?: string
    company: string
    email: string
    lastName: string
    name: string
    cellPhone?: string
}

export interface IProduct {
    id: string
    name: string
    price: number
    stock: number
    quantity:? number
    __typename?: string
}

export interface IState {
    customer: ICustomer
    products: IProduct[]
    total: number
}

export interface IProductProps {
    product: IProduct
}

export interface IOrder {
    customer: ICustomer
    id: string
    state: string
    total: number
    order: OrderType[]
}

export interface ISellerGraphics {
    seller?: ISeller[]
    company?: string
    name?: string
    total?: number
    __typename?: string
}

type ISeller = {
    email: string
    name: string
    __typename: string
}

type OrderType = {
    name: string
    id: string
    quantity: number
}

export interface ICustomerGraphics {
    customer?: ICustomer[]
    company?: string
    name?: string
    total?: number
    __typename?: string
}
