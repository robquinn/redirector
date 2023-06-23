import { Client, cacheExchange, fetchExchange } from '@urql/core'
import isProd from '../utils/is-prod'

let graphqlEndpoint: string

if (isProd()) {
  graphqlEndpoint = `${process.env.SERVER__PRODUCTION_URL}${process.env.SERVER__GRAPHQL_PATHNAME}`
} else {
  graphqlEndpoint = `http://${process.env.SERVER__HOSTNAME}:${
    process.env.PORT ?? process.env.SERVER__PORT
  }${process.env.SERVER__GRAPHQL_PATHNAME}`
}

const urqlClient = new Client({
  url: graphqlEndpoint,
  exchanges: [cacheExchange, fetchExchange],
})

export default urqlClient
