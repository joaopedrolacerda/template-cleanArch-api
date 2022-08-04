import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'

import { LoadUserAccountRepository } from '@/data/contracts/respos'
export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserByTokenApi: LoadFacebookUserApi,
    private readonly loadUserAccount: LoadUserAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.loadFacebookUserByTokenApi.loadUser(params)
    if (fbData !== undefined) {
      await this.loadUserAccount.load({ email: fbData?.email })
    }
    return new AuthenticationError()
  }
}
