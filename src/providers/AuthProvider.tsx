import { LoginFormValue } from 'src/modules/auth/login/types'
import { Auth } from '../api'
import { createContext, ReactNode, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthStore, initialAuthState, useAuthReducer } from 'src/stores/useAuthReducer.ts'
import { AuthenticatedUser, TokenData } from 'api/auth/types.ts'

export interface AuthContextType {
    state: AuthStore
    signin: (value: LoginFormValue) => void
    signOut: () => void
    getAuthUser: () => AuthenticatedUser | null
}

const initialAuthContext: AuthContextType = {
  state: initialAuthState,
  signin: async () => ({}),
  signOut: () => ({}),
  getAuthUser: () => null
}

export const AuthContext = createContext<AuthContextType>(initialAuthContext)

export const useAuth = (): AuthContextType  => {
  return useContext<AuthContextType>(AuthContext)
}

export const AuthProvider = ({ children } : { children: ReactNode }) => {
  const [state, dispatch] = useAuthReducer()
  const navigate = useNavigate()
  const location = useLocation()

  const getAuthUser = (redirectFrom = false) => {
    const userData = localStorage.getItem('userData')
    if (userData === null) return null
    const parsedUserData = JSON.parse(userData)
    if (redirectFrom) navigate(location.state?.from?.pathname || '/', { replace: true })
    return {
      id: parsedUserData.id,
      username: parsedUserData.username,
      roles: parsedUserData.roles,
      clinicName: parsedUserData.clinicName,
      avatar: parsedUserData.avatar
    } as AuthenticatedUser | null
  }

  const signin = async (value: LoginFormValue) => {
    dispatch({ type: 'SEND_TOKEN_REQUEST' })
    const response: TokenData = await Auth.logIn(value)
    dispatch({ type: 'DONE_TOKEN_REQUEST', payload: response })
    if (response.data !== null) {
      localStorage.setItem('userData', JSON.stringify(response.data))
      if (response.data) getAuthUser(true)
    }
  }

  const signOut = async () => {
    dispatch({ type: 'SEND_DELETE_TOKEN' })
    localStorage.removeItem('userData')
    localStorage.removeItem('patientFilters')
    localStorage.removeItem('patients')
    navigate('/login')
    dispatch({ type: 'DONE_DELETE_TOKEN' })
  }

  const value: AuthContextType = { state, getAuthUser, signOut, signin }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
