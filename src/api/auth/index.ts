import { AuthenticatedUser, TokenData } from 'api/auth/types.ts'
import { LoginFormValue } from 'src/modules/auth/login/types'
import { parseAuth, parseAuthUser } from 'api/auth/parsers.ts'

export const logIn = async (params: LoginFormValue): Promise<TokenData> => {
  return parseAuth(params)
}

export const getAuthUser = async (): Promise<AuthenticatedUser | null> => {
  return parseAuthUser()
}
