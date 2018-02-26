import { PubSub } from 'graphql-subscriptions';
import  cors  from 'cors';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

export const pubsub = new PubSub();

import booksDb from './books';

const PORT = 3000;
const WS_PORT = 3001;
const APP_URL = 'http://localhost:8080';

const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

websocketServer.listen(WS_PORT, () => console.log(
  `Websocket Server is now running on http://localhost:${WS_PORT}`
));

const typeDefs = `
  type Book {
    id: ID!
    title: String
    sales: Int
    author: String
    description: String
  }
  type Query {
    book(id: ID!): Book
    bookList: [Book]
  }
  type Mutation {
    bumpSales(id: ID!): [Book]
  }
`;
const resolvers = {
  Query: {
    book(_, {id}) {
      return booksDb.find(book => book.id === id);
    },
    bookList() {
      return booksDb;
    },
  },
  Mutation: {
    bumpSales(_, { id }) {
      console.log(`bumping sales for ${id}`);
      const book = booksDb.find(book => book.id === id);
      book.sales = book.sales + 1;
      return booksDb;
    }
  },
};
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe
  },
  {
    server: websocketServer,
    path: '/graphql'
  });


const app = express();

// Enable pre-flighting on all requests.
// See: https://www.npmjs.com/package/cors#enabling-cors-pre-flight
app.options('*', cors());
// Only allow cross origin requests
// coming from the URL specified above.
app.use(cors({ origin: APP_URL }));

// bodyParser is needed for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
});

