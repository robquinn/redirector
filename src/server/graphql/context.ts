import { PrismaClient } from '@prisma/client'
import isProd from '../utils/is-prod'

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: isProd()
        ? process.env.DATABASE__DB_URL_PROD
        : process.env.DATABASE__DB_URL_DEV,
    },
  },
})

export interface Context {
  prisma: PrismaClient
}

export const createContext = (): Context => ({ prisma })
