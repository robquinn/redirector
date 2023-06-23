declare namespace Redirector {
  namespace Response {
    namespace Components {
      type Hash = string
      type Status = 'CODE_DOES_NOT_EXIST' | 'DELETED' | 'NOT_DELETED'
      type Valid = boolean
    }
    namespace Body {
      interface Hash {
        hash: Components.Hash
      }

      interface Verifier extends Hash {
        valid: Components.Valid
      }
      interface Deleter extends Hash {
        status: Components.Status
      }
    }
  }
}
