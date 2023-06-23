declare namespace Redirector {
  namespace Client {
    interface UrlParams {
      code: string
    }
    type PathToRedirecterVerify = string
    interface IClient {
      init: () => Promise<void>
    }
  }
  namespace Verifier {
    type HashInUrlParam = string
    interface IVerifier {
      init: () => Promise<void>
      codeInUrlParamIsValid: () => Promise<boolean>
      verifyThatHashIsValid: (
        resFromRedirecter: Redirector.Response.Body.Verifier,
      ) => boolean
    }
  }
}
