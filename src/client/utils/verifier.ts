import { IsCodeValidMutationDocument } from '../../server/graphql/generated/graphql'
import urqlClient from '../urql/client'

type IVerifier = Redirector.Verifier.IVerifier

export default class Verifier implements IVerifier {
  private readonly hashInUrlParam: Redirector.Verifier.HashInUrlParam

  constructor(hashInUrlParam: string) {
    this.hashInUrlParam = hashInUrlParam
  }

  async init(): Promise<void> {
    if (await this.codeInUrlParamIsValid()) {
      await Verifier.fillAndSubmitForm()
    } else {
      alert('You do not have the proper privileges to access this site')
    }
  }

  async codeInUrlParamIsValid(): Promise<boolean> {
    const result = await urqlClient
      .mutation(IsCodeValidMutationDocument, { hash: this.hashInUrlParam })
      .toPromise()
    return this.verifyThatHashIsValid(
      result.data?.IsCodeValidMutation as Redirector.Response.Body.Verifier,
    )
  }

  verifyThatHashIsValid(
    resFromRedirecter: Redirector.Response.Body.Verifier,
  ): boolean {
    return (
      resFromRedirecter.hash === this.hashInUrlParam && resFromRedirecter.valid
    )
  }

  static getFormElement(): HTMLFormElement {
    return document.getElementsByClassName(
      'password-form',
    )[0] as HTMLFormElement
  }

  static getFormSubmitButton(): HTMLButtonElement {
    return document.querySelector('button.arrow-icon') as HTMLButtonElement
  }

  static submitForm(): void {
    const button = this.getFormSubmitButton()
    button.click()
  }

  static async fillOutForm(): Promise<{ status: string }> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    return await new Promise((resolve) => {
      const formElement = Verifier.getFormElement()
      if (formElement != null) {
        const children = formElement.childNodes
        for (let i = 0; i < children.length; i += 1) {
          console.log('nodeName', children[i].nodeName)
          console.log('nodeType', children[i].nodeType)
          if (children[i].nodeName === 'INPUT') {
            ;(children[i] as HTMLInputElement).value +=
              process.env.PORTAL__PASSWORD
            resolve({ status: 'success' })
          }
        }
      }
    })
  }

  static async fillAndSubmitForm(): Promise<void> {
    const { status } = await Verifier.fillOutForm()
    if (status === 'success') {
      Verifier.submitForm()
    } else if (status === 'error') {
      console.log('error')
    } else {
      console.log('unknown error')
    }
  }
}
