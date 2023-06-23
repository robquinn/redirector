import { Client, cacheExchange, fetchExchange } from '@urql/core'

const graphqlEndpoint = `http://${process.env.SERVER__HOSTNAME}:${process.env.SERVER__PORT}${process.env.SERVER__GRAPHQL_PATHNAME}`

const urqlClient = new Client({
  url: graphqlEndpoint,
  exchanges: [cacheExchange, fetchExchange],
})

export default urqlClient
