import Verifier from './verifier'

type IClient = Redirector.Client.IClient

export default class Client implements IClient {
  private readonly urlParams: Redirector.Client.UrlParams

  constructor() {
    this.urlParams = {
      code: 'code',
    }
  }

  async init(): Promise<void> {
    if (Client.urlParamExists(this.urlParams.code)) {
      const hashInUrlParam = Client.getUrlParam(this.urlParams.code)
      const verifier = new Verifier(hashInUrlParam)
      await verifier.init()
    }
  }

  static getUrlParam(paramName: string): string {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(paramName) as string
  }

  static urlParamExists(paramName: string): boolean {
    const field = paramName
    const url = window.location.href
    if (url.includes(`?${field}=`)) return true
    if (url.includes(`&${field}=`)) return true
    return false
  }
}
