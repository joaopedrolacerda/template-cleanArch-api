import { FacebookAuthentication } from '@/domain/features'
class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserByTokenApi: LoadFacebookUserApi
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<void> {
    await this.loadFacebookUserByTokenApi.loadUser(params)
  }
}

interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<void>
}
namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }
}
class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  async loadUser (params: LoadFacebookUserApi.Params): Promise<void> {
    this.token = params.token
  }
}
describe('FacebookAuthenticationService', () => {
  it('should cal LoadFacebookUserApi', async () => {
    const LoadFacebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(LoadFacebookUserApi)

    await sut.perform({ token: 'any_token' })

    expect(LoadFacebookUserApi.token).toBe('any_token')
  })
})
