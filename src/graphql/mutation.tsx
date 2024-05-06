import gql from "graphql-tag";

export const NEW_CUSTOMER = gql`
mutation newCustomer($input:CustomerInput){
    addNewCustomer(input: $input) {
      name
      lastName
    }
  }
`

export const AUTH_USER = gql`
mutation authUser($input: AuthInput) {
    authUser(input: $input) {
      token
    }
  }
`

export const DELETE_CUSTOMER = gql`
mutation removeCustomer($deleteCustomerId: ID!) {
  deleteCustomer(id: $deleteCustomerId)
}
`
export const NEW_ACCOUNT = gql`
mutation newUser($input: UserInput) {
    newUser(input: $input){
      id
      name
      lastName
      email
    }
  }
`

export const UPDATE_CUSTOMER = gql`
mutation($updateCustomerId: ID!, $input: CustomerInput) {
  updateCustomer(id: $updateCustomerId, input: $input) {
    name
    email
  }
}
`
export const REMOVE_PRODUCT = gql`
  mutation deleteProduct($removeProductId: ID!){
    removeProduct(id: $removeProductId)
  }
`

export const NEW_PRODUCT = gql`
mutation NewProduct($input: ProductInput) {
  newProduct(input: $input) {
    id
    name
    price
    stock
    createdAt
  }
}
`

export const UPDATE_PRODUCT = gql`
mutation updateProduct($updateProductId: ID!){
  updateProduct(id: $updateProductId) {
    id
    name
    stock
    price
  }
}
`

export const NEW_ORDER = gql`
mutation newOrder($newOrder: OrderInput) {
  newOrder(input: $newOrder){
    id
  }
}
`

export const UPDATE_ORDER = gql`
mutation updateOrder($updateOrderId: ID!, $input: OrderInput){
  updateOrder(id: $updateOrderId, input: $input) {
    state,
    id
  }
}
`

export const REMOVE_ORDER = gql`
mutation removeOrder($removeOrderId: ID!){
  removeOrder(id: $removeOrderId)
}
`