import { LoginFormValue } from 'src/modules/auth/login/types'
import { AuthenticatedUser, TokenData } from 'api/auth/types.ts'

export const parseAuth = (response: LoginFormValue): TokenData => {
  const randomName = Math.random().toString(36).substring(2, 10)
  const randomDomain = Math.random().toString(36).substring(2, 6)

  const randomString = Math.random().toString(36).substring(2, 18) // Random string with a length of 16 characters
  const timestamp = Date.now().toString(36) // Timestamp in base 36

  return {
    data: {
      accessToken: `${randomString}-${timestamp}`,
      refreshToken: `${randomString}-${timestamp}`,
      username: response.username,
      email: `${randomName}@${randomDomain}.com`,
      isAdmin: false,
      id: Date.now() + '-' + Math.floor(Math.random() * 10000)
    }
  }
}

export const parseAuthUser = (): AuthenticatedUser | null => {
  const userData = localStorage.getItem('userData')
  if (userData === null) return null
  const parsedUserData = JSON.parse(userData)
  return {
    id: parsedUserData.id,
    isAdmin: parsedUserData.isAdmin,
    email: parsedUserData.email,
    username: parsedUserData.email
  }
}
