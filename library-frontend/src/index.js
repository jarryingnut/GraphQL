import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, split } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { setContext } from 'apollo-link-context'
import {BrowserRouter as Router} from 'react-router-dom'

import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'




const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('graphql-library-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const wsLink = new WebSocketLink ({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
}) 

ReactDOM.render(
  <ApolloProvider client={client}>
   <ChakraProvider>
   <Router>
      <App />
      </Router>
    </ChakraProvider>
  </ApolloProvider>
  ,
  document.getElementById('root')
);

