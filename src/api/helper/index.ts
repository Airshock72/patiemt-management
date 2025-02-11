import { ResponseStatuses } from 'api/types/apiGlobalTypes.ts'

export const getErrorMessages = async (response: Response): Promise<Array<Error>> => {
  const responseErrors: Record<string, unknown> = await response.json()
  switch (response.status) {
  case ResponseStatuses.UNPROCESSABLE_ENTITY:
    return ((): Array<Error> => {
      const errors = [] as Array<Error>
      if (responseErrors.message && !responseErrors.errors) {
        errors.push({ name: 'message', message: (responseErrors as Record<string, string>).message as string })
        return errors
      }
      if (responseErrors) {
        Object.keys(responseErrors.errors as  Record<string, Array<string>>).forEach(el => {
                        (responseErrors.errors as Record<string, Array<string>>)[el]!.forEach(
                          message => errors.push({ name: el, message: message })
                        )
        })
      }
      return errors
    })()
  case ResponseStatuses.NOT_FOUND:
    return [{ name: 'not found', message: 'მისამართი არ მოიძებნა' }]
  case ResponseStatuses.TOO_LARGE:
    return [{ name: 'too large', message: 'დიდი ზომის ფაილი. დასაშვები ფაილის ზომა არის 20 მგ' }]
  case ResponseStatuses.METHOD_NOT_ALLOWED:
    return [{ name: 'not allowed', message: responseErrors.message as string }]
  case ResponseStatuses.TOO_MANY:
    return [{ name: 'too many', message: (responseErrors as Record<string, string>).message as string }]
  case ResponseStatuses.FORBIDDEN:
    return [{ name: 'forbidden', message: responseErrors.message as string }]
  case ResponseStatuses.CONFLICT:
    return [{ name: 'conflict', message: (responseErrors as Record<string, string>).message as string }]
  case ResponseStatuses.SERVER_ERROR:
    return [{ name: 'server error', message: 'status-500 something went wrong' }]
  case ResponseStatuses.UNAUTHENTICATED:
    return [{ name: 'Unauthenticated', message: 'თქვენ არ ხართ ავტორიზირებული, გთხოვთ გაიაროთ ავტორიზაცია' }]
  default:
    return [{ name: 'unknown', message: 'something went wrong' }]
  }
}

export const throwException = (err: unknown): void => {
  console.error(err)
}
