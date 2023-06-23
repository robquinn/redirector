import { extendType, nonNull, stringArg } from 'nexus'
import type { Context } from '../context'
import * as Models from './models'

const Mutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('IsCodeValidMutation', {
      type: nonNull(Models.IsCodeValidResponse),
      args: {
        hash: nonNull(stringArg()),
      },
      resolve: async (parent, args, context: Context) => {
        const code = await context.prisma.code.findFirst({
          where: {
            hash: args.hash,
          },
        })
        await context.prisma.code.delete({
          where: { id: code?.id as number },
        })
        if (code != null) {
          return { hash: args.hash, valid: true }
        }
        return { hash: args.hash, valid: false }
      },
    })
  },
})

export default Mutations
