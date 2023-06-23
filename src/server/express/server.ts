// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled'
import asyncHandler from 'express-async-handler'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import { schema } from '../graphql/nexus.schema'
import { createContext, prisma } from '../graphql/context'
import type { Context } from '../graphql/context'
import randomString from '../utils/random-string'

// Required logic for integrating with Express
const app = express()
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app)

export default httpServer

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer<Context>({
  schema,
  // context: createContext,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageDisabled(),
  ],
})

;(async () => {
  await server.start()

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.

  const origins = {
    connect: /http[s]?:\/\/connect\.russlyon\.com/gm,
    foundation: /http[s]?:\/\/(www\.)?russlyonfoundation\.org/gm,
    localhost: new RegExp(
      `/^http[s]?://(localhost|127.0.0.1|${process.env.SERVER__HOSTNAME}):${
        process.env.SERVER__PORT ?? 80
      }/gm`,
    ),
  }

  app.use(
    express.static(path.resolve(process.cwd(), 'dist', 'client')),
    cors<cors.CorsRequest>({
      // origin: `/$|^http[s]?://localhost:${process.env.SERVER__PORT ?? 4000}$/gm`,
      origin: [origins.foundation],
      methods: 'GET,HEAD,PUT,PATCH,POST,OPTIONS,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    }),
  )
  app.use(bodyParser.json())

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: [origins.localhost, '*'], // origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,OPTIONS,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    }),
    expressMiddleware(server, {
      context: async () => createContext(),
    }),
  )

  app.get(
    '/',
    cors<cors.CorsRequest>({
      origin: [origins.connect],
      methods: 'GET,HEAD,PUT,PATCH,POST,OPTIONS,DELETE',
      allowedHeaders: ['Content-Type'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    }),
    asyncHandler(async (req, res) => {
      const code = await prisma.code.create({
        data: {
          hash: randomString(1500),
        },
      })
      res.redirect(`${process.env.PORTAL__REDIRECT_URL}?code=${code.hash}`)
    }),
  )
})()
  .then(() => true)
  .catch((err) => {
    console.log('Express server starting ERROR', err)
  })
