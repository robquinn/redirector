import * as path from 'path'
import { type CodegenConfig } from '@graphql-codegen/cli'

const pathToSchema = path.resolve(
  process.cwd(),
  'src/server/graphql/generated/schema.graphql',
)
const config: CodegenConfig = {
  overwrite: true,
  schema: pathToSchema, // GraphQL endpoint
  documents: './src/server/graphql/**.ts', //  parse graphql operations in matching files
  generates: {
    './src/server/graphql/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-resolvers',
        'typed-document-node',
      ],
      config: {
        scalars: {
          JSON: 'string',
          UUID: 'string',
          Date: 'string',
        },
      },
    },
  },
}

export default config
