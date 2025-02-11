import { ID, ResponseStatuses } from 'api/types/apiGlobalTypes.ts'

export interface TokenData {
    readonly data: Token & AuthenticatedUser | null
}

export interface Token {
    expiresIn?: number
    accessToken: string
    refreshToken: string
}

export interface AuthenticatedUser {
    readonly id: ID | null
    readonly username: string
    readonly isAdmin: boolean
    readonly email: string
}

export interface AuthUserData {
    readonly data: AuthenticatedUser | null
    readonly errors: Array<Error> | null
    readonly status: ResponseStatuses
}
