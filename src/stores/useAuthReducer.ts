import { AuthenticatedUser, Token, TokenData } from 'api/auth/types'
import { Dispatch, useReducer } from 'react'
import { SignUpUserFormValues } from 'src/modules/auth/signup/types'

export interface AuthStore {
    readonly data: {
        user: AuthenticatedUser | null
        token: Token | null
    }
    readonly isFetchingUser: boolean
    readonly isFetchingToken: boolean
    readonly isRevoking: boolean
}

export type SEND_AUTH_USER_REQUEST = 'SEND_AUTH_USER_REQUEST'
export type DONE_AUTH_USER_REQUEST = 'DONE_AUTH_USER_REQUEST'

export type SEND_TOKEN_REQUEST = 'SEND_TOKEN_REQUEST'
export type DONE_TOKEN_REQUEST = 'DONE_TOKEN_REQUEST'

export type SEND_DELETE_TOKEN = 'SEND_DELETE_TOKEN'
export type DONE_DELETE_TOKEN = 'DONE_DELETE_TOKEN'

export type SET_USER_VALUES = 'SET_USER_VALUES'

export type AuthActions =
    | { type: SEND_AUTH_USER_REQUEST }
    | { type: DONE_AUTH_USER_REQUEST, readonly payload: AuthenticatedUser | null }
    | { type: SEND_DELETE_TOKEN }
    | { type: DONE_DELETE_TOKEN }
    | { type: SEND_TOKEN_REQUEST }
    | { type: DONE_TOKEN_REQUEST, readonly payload: TokenData }
    | { type: SET_USER_VALUES, readonly payload: SignUpUserFormValues }

export const initialAuthState: AuthStore = {
  data: {
    user: null,
    token: null
  },
  isFetchingUser: true,
  isFetchingToken: false,
  isRevoking: false
}

export const initialAuthenticatedUser: AuthenticatedUser = {
  id: null,
  isAdmin: false,
  username: '',
  email: ''
}

export const useAuthReducer = (): [AuthStore, Dispatch<AuthActions>] => {
  return useReducer(authReducer, initialAuthState)
}

export const authReducer = (state: AuthStore, action: AuthActions): AuthStore => {
  switch (action.type) {
  case 'SEND_AUTH_USER_REQUEST':
    return {
      ...state,
      isFetchingUser: true
    }
  case 'DONE_AUTH_USER_REQUEST':
    return {
      ...state,
      data: {
        ...state.data,
        user: action.payload ? action.payload : state.data.user
      },
      isFetchingUser: false
    }
  case 'SEND_DELETE_TOKEN':
    return {
      ...state,
      isRevoking: true
    }
  case 'DONE_DELETE_TOKEN':
    return {
      ...state,
      isRevoking: false
    }
  case 'SEND_TOKEN_REQUEST':
    return {
      ...state,
      isFetchingToken: true
    }
  case 'DONE_TOKEN_REQUEST':
    return {
      ...state,
      data: {
        ...state.data,
        token: action.payload.data
      },
      isFetchingToken: false
    }
  case 'SET_USER_VALUES':
    return {
      ...state,
      data: {
        ...state.data,
        user: {
          ...state.data.user,
          email: action.payload.email,
          isAdmin: false,
          username: action.payload.username,
          id: Date.now() + '-' + Math.floor(Math.random() * 10000)
        }
      }
    }
  default:
    return state
  }
}
