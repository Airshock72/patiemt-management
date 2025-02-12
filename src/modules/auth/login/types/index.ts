import { UserRole } from 'api/auth/types.ts'

export interface LoginFormValue {
    username: string
    password: string
    roles: Array<UserRole>
}
