import { AuthenticatedUser, TokenData } from 'api/auth/types'
import { Dispatch, useReducer } from 'react'

export interface AuthStore {
    readonly data: { user: AuthenticatedUser | null }
    readonly isFetchingUser: boolean
    readonly isFetchingToken: boolean
    readonly isRevoking: boolean
}

export type SEND_TOKEN_REQUEST = 'SEND_TOKEN_REQUEST'
export type DONE_TOKEN_REQUEST = 'DONE_TOKEN_REQUEST'

export type SEND_DELETE_TOKEN = 'SEND_DELETE_TOKEN'
export type DONE_DELETE_TOKEN = 'DONE_DELETE_TOKEN'

export type AuthActions =
    | { type: SEND_DELETE_TOKEN }
    | { type: DONE_DELETE_TOKEN }
    | { type: SEND_TOKEN_REQUEST }
    | { type: DONE_TOKEN_REQUEST, readonly payload: TokenData }

export const initialAuthState: AuthStore = {
  data: { user: null },
  isFetchingUser: true,
  isFetchingToken: false,
  isRevoking: false
}

export const useAuthReducer = (): [AuthStore, Dispatch<AuthActions>] => {
  return useReducer(authReducer, initialAuthState)
}

export const authReducer = (state: AuthStore, action: AuthActions): AuthStore => {
  switch (action.type) {
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
        user: action.payload.data
      },
      isFetchingToken: false
    }
  default:
    return state
  }
}
