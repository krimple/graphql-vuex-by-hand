import {SubscriptionClient} from 'subscriptions-transport-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
// import { HttpLink } from 'apollo-link-http';

// Create an http link:
// const httpLink = new HttpLink({
//  uri: 'http://localhost:3000/graphql'
// });

const GRAPHQL_ENDPOINT = 'ws://localhost:3001/graphql'; // Your GraphQL endpoint

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: GRAPHQL_ENDPOINT,
  options: {
    reconnect: true
  }
});

// Create WebSocket client
const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  link: wsLink,
  networkInterface: client
});

console.dir(apolloClient);
export default apolloClient;

