import gql from "graphql-tag";

export const GET_CUSTOMERS = gql`
query getCustomerSellers {
  getCustomerSellers {
    id
    company
    email
    lastName
    name
  }
}
`
export const GET_USER = gql`
query getUser{
    getUser {
        createdAt
        email
        id
        lastName
        name
    }
}
`
export const GET_CUSTOMER = gql`
  query getCustomer($getCustomerId: ID!) {
    getCustomer(id: $getCustomerId) {
      lastName
      name
      seller
      email
      company
      cellPhone
    }
  }
`

export const GET_PRODUCTS = gql`
query getAllProducts {
  getAllProducts {
    name
    price
    stock
    id
  }
}
`

export const GET_PRODUCT = gql`
query getProduct($getProductId: ID!) {
  getProduct(id: $getProductId) {
    name
    price
    stock
  }
}
`

export const GET_ORDERS = gql`
query getOrderByCustomer {
  getOrderByCustomer {
    id
    order{
      id
      quantity
      name
    }
    customer{
      id
      name
      lastName
      email
      cellPhone
    }
    seller
    total
    state
  }
}
`

export const GET_ORDERS_ONLY_IDS = gql`
query getOrderByCustomer {
  getOrderByCustomer {
    id
  }
}
`

export const BEST_SELLERS = gql`
query getBestSellers {
  getBestSellers {
    total
    seller {
      name
      email
    }
  }
}
`

export const BEST_CUSTOMERS = gql`
query getBestCustomers {
  getBestCustomers {
    customer {
      name
      company
    }
    total
  }
}
`