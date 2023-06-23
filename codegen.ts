import { type CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/server/graphql/generated/schema.graphql', // GraphQL endpoint
  documents: 'src/server/graphql/**.ts', //  parse graphql operations in matching files
  generates: {
    'src/server/graphql/generated/graphql.ts': {
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
