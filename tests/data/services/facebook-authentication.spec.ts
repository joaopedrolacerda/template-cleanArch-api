import { FacebookAuthentication } from '@/domain/features'
class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserByTokenApi: LoadFacebookUserByTokenApi
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<void> {
    await this.loadFacebookUserByTokenApi.loadUserByToken(params.token)
  }
}

interface LoadFacebookUserByTokenApi {
  loadUserByToken: (token: string) => Promise<void>
}
class LoadFacebookUserByTokenApiSpy implements LoadFacebookUserByTokenApi {
  token?: string
  async loadUserByToken (token: string): Promise<void> {
    this.token = token
  }
}
describe('FacebookAuthenticationService', () => {
  it('', async () => {
    const LoadFacebookUserByTokenApi = new LoadFacebookUserByTokenApiSpy()
    const sut = new FacebookAuthenticationService(LoadFacebookUserByTokenApi)

    await sut.perform({ token: 'any_token' })

    expect(LoadFacebookUserByTokenApi.token).toBe('any_token')
  })
})
