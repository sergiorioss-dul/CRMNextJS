import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from 'apollo-link-context'

// here please put the url of your backend
// this is the url of the backend https://github.com/sergiorioss-dul/CRMGraphql
const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
})

const authLink = setContext((_, { headers }) => {

    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
})

export default client

