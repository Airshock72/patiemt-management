import { LoginFormValue } from 'src/modules/auth/login/types'
import { Auth } from '../api'
import { SignUpUserFormValues } from 'src/modules/auth/signup/types'
import { createContext, ReactNode, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthStore, initialAuthState, useAuthReducer } from 'src/stores/useAuthReducer.ts'
import { TokenData } from 'api/auth/types.ts'

export interface AuthContextType {
    state: AuthStore
    signin: (value: LoginFormValue) => void
    signOut: () => void
    getAuthUser: () => void
    setUser: (values: SignUpUserFormValues) => void
}

const initialAuthContext: AuthContextType = {
  state: initialAuthState,
  signin: async () => ({}),
  signOut: () => ({}),
  getAuthUser: async () => ({}),
  setUser: (initialRegisterUser) => (console.error(initialRegisterUser))
}

export const AuthContext = createContext<AuthContextType>(initialAuthContext)

export const useAuth = (): AuthContextType  => {
  return useContext<AuthContextType>(AuthContext)
}

export const AuthProvider = ({ children } : { children: ReactNode }) => {
  const [state, dispatch] = useAuthReducer()
  const navigate = useNavigate()
  const location = useLocation()

  const getAuthUser = async (redirectFrom = false) => {
    dispatch({ type: 'SEND_AUTH_USER_REQUEST' })
    const response = await Auth.getAuthUser()
    dispatch ({ type: 'DONE_AUTH_USER_REQUEST', payload: response })
    if (response === null) localStorage.removeItem('userData')
    if (redirectFrom) navigate(location.state?.from?.pathname || '/', { replace: true })
  }

  const setUser = async (values: SignUpUserFormValues) => {
    dispatch({ type: 'SET_USER_VALUES', payload: values })
  }

  const signin = async (value: LoginFormValue) => {
    dispatch({ type: 'SEND_TOKEN_REQUEST' })
    const response: TokenData = await Auth.logIn(value)
    dispatch({ type: 'DONE_TOKEN_REQUEST', payload: response })
    if (response.data !== null) {
      localStorage.setItem('userData', JSON.stringify(response.data))
      if (response.data) getAuthUser(true).then()
    }
  }

  const signOut = async () => {
    dispatch({ type: 'SEND_DELETE_TOKEN' })
    localStorage.removeItem('userData')
    navigate('/login')
    dispatch({ type: 'DONE_DELETE_TOKEN' })
  }

  const value: AuthContextType = { state, getAuthUser, signOut, signin, setUser }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
