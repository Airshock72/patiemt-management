export enum RoutePathTypes {
  HOME = '/',
  LOGIN = '/login',
  SIGNUP = '/signup'
}

export enum ResponseStatuses {
  UNEXPECTED = 1,
  SUCCESS = 200,
  CREATED = 201,
  UNAUTHENTICATED = 401,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  TOO_LARGE = 413,
  FORBIDDEN = 403,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY = 429,
  SERVER_ERROR = 500
}

export type ID = string

export interface GlobalResponse {
  content: unknown | null
  status: ResponseStatuses
  errors: Array<Error> | null
}
