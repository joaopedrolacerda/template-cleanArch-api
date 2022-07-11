import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

describe('FacebookAuthenticationService', () => {
  it('should cal LoadFacebookUserApi', async () => {
    const LoadFacebookUserApi = {
      loadUser: jest.fn()
    }
    const sut = new FacebookAuthenticationService(LoadFacebookUserApi)

    await sut.perform({ token: 'any_token' })

    expect(LoadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(LoadFacebookUserApi.loadUser).toBeCalledTimes(1)
  })
  it('should return AuthenticationError when loadFacebookUserApi returns undefined', async () => {
    const LoadFacebookUserApi = {
      loadUser: jest.fn()
    }
    LoadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(LoadFacebookUserApi)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
