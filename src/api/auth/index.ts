import { TokenData } from 'api/auth/types.ts'
import { LoginFormValue } from 'src/modules/auth/login/types'
import { parseAuth } from 'api/auth/parsers.ts'

export const logIn = async (params: LoginFormValue): Promise<TokenData> => {
  return parseAuth(params)
}
