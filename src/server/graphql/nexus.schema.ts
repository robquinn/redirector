import { makeSchema } from 'nexus'
// import {nexusPrisma} from 'nexus-plugin-prisma'
import path from 'path'
import * as types from './resolvers'
// Schema Generation
export const schema = makeSchema({
  types,
  outputs: {
    typegen: path.resolve(
      process.cwd(),
      'src',
      'server',
      'graphql',
      'generated',
      'nexus.d.ts',
    ),
    schema: path.resolve(
      process.cwd(),
      'src',
      'server',
      'graphql',
      'generated',
      'schema.graphql',
    ),
  },
  // sourceTypes: {
  //   modules: [
  //     {
  //       module: '.prisma/client/index.d.ts',

  //       alias: 'prisma',
  //     },
  //   ],
  // },
})

export default schema
