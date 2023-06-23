import gql from 'graphql-tag'

// eslint-disable-next-line import/prefer-default-export
export const IS_CODE_VALID = gql`
  mutation IsCodeValidMutation($hash: String!) {
    IsCodeValidMutation(hash: $hash) {
      hash
      valid
    }
  }
`
