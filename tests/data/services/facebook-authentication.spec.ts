import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserByTokenApi: LoadFacebookUserApi
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUserByTokenApi.loadUser(params)
    return new AuthenticationError()
  }
}

interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<LoadFacebookUserApi.Result>
}
namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }

  export type Result = undefined
}
class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined
  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token
    return this.result
  }
}
describe('FacebookAuthenticationService', () => {
  it('should cal LoadFacebookUserApi', async () => {
    const LoadFacebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(LoadFacebookUserApi)

    await sut.perform({ token: 'any_token' })

    expect(LoadFacebookUserApi.token).toBe('any_token')
  })
  it('should return AuthenticationError when loadFacebookUserApi returns undefined', async () => {
    const LoadFacebookUserApi = new LoadFacebookUserApiSpy()

    LoadFacebookUserApi.result = undefined
    const sut = new FacebookAuthenticationService(LoadFacebookUserApi)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
