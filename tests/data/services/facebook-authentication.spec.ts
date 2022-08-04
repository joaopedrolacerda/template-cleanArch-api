import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
import { LoadUserAccountRepository } from '@/data/contracts/respos'
import { AuthenticationError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
  let loadUserAccountRepo: MockProxy<LoadUserAccountRepository>
  let sut: FacebookAuthenticationService
  const token = 'any_token'
  beforeEach(() => {
    loadFacebookUserApi = mock()
    loadFacebookUserApi.loadUser.mockResolvedValue(
      {
        name: 'any_fb_name',
        email: 'any_fb_email',
        facebookId: 'any_fb_id'
      }
    )
    loadUserAccountRepo = mock()
    sut = new FacebookAuthenticationService(
      loadFacebookUserApi,
      loadUserAccountRepo
    )
  })
  it('should cal LoadFacebookUserApi', async () => {
    await sut.perform({ token })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toBeCalledTimes(1)
  })
  it('should return AuthenticationError when loadFacebookUserApi returns undefined', async () => {
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })
  it('should call loadUserAccounByEmailRepo when  loadFacebookUserApi returns data', async () => {
    await sut.perform({ token })

    expect(loadUserAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
    expect(loadUserAccountRepo.load).toBeCalledTimes(1)
  })
})
