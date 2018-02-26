# graphql-vuex-by-hand

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install
```

## Running

``` bash
# serve Express and GraphQL / Apollo Server on port 3000/3001
npm run dev

# serve client-facing webapp on http://localhost:8080
npm start
```

## Architecture

### Server  (`api/server.js`)

* NodeJS w/Express serving up an Apollo client in `api/server.js`
    * Data loaded on startup from JSON data store in `api/books.json`
    * Schema defined with Apollo `subscriptionServer` API with `graphql-tools`
    * GraphQL engine is Apollo server with `apollo-server-express`
    * HTTP Server exposed on port 3000 (for HTTP API) with `apollo-server-express`
    * Server also exposed as websocket server on port 3001 with `subscriptions-transport-ws` and `graphql-subscriptions` using `PubSub` model

### Client

* GraphQL integration in `src/utils/apollows-client.js` and tied to Vue via Vuex in `src/store/index.js`
* Webpack Dev Server running on port 8080
    * Client API stack (currently ALL websockets) with code in `src/utils/apollows-client`
    * CORS enabled to talk back to other servers/ports via `cors` library
    * Auto-reconnect enabled (shut down API servers and start up again, see app stay live)

Blog to come...
