import { objectType } from 'nexus'
import { Code } from 'nexus-prisma'

export const IsCodeValidResponse = objectType({
  name: 'IsCodeValidResponse',
  definition(t) {
    t.nonNull.string('hash', { description: 'randomly generated hash' })
    t.nonNull.boolean('valid', {
      description: 'indicates if the code is valid or not',
    })
  },
})

export const CodeModel = objectType({
  name: Code.$name,
  description: Code.$description,
  definition(t) {
    t.field(Code.id)
    t.field(Code.hash)
    t.field(Code.createdAt)
    t.field(Code.updatedAt)
  },
})
