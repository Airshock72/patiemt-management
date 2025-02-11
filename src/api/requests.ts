import { GlobalResponse } from 'api/types/apiGlobalTypes'
import { getErrorMessages, throwException } from 'api/helper'
import { stringify } from 'core/helpers/queryString'

const baseURL = process.env.API_BASE_URL
export const sendRequest = async (
  url: string,
  method: string,
  params: unknown,
  BodyInit?: BodyInit,
  file?: boolean
): Promise<GlobalResponse> => {
  try {
    const urlParams = stringify(params, { encode: false })
    const headersObject = {
      'Accept-Language': 'ka',
      'Accept': 'application/json'
    }
    const headers = file ? headersObject : { ...headersObject, 'Content-Type': 'application/json' }
    const body = file ? BodyInit : BodyInit && JSON.stringify(BodyInit)

    const response = await fetch(baseURL + url + urlParams, {
      body,
      headers,
      method: method
    })
    if (!response.ok) {
      return {
        status: response.status,
        content: null,
        errors: await getErrorMessages(response)
      }
    }
    const content = await response.json()
    return {
      status: response.status,
      content: content,
      errors: null
    }
  } catch (error) {
    throwException(error)
    return {
      status: 1,
      content: null,
      errors: [{ name: 'catch', message: 'unexpected' }]
    }
  }
}

export const post = (url: string, body: unknown, file = false): Promise<GlobalResponse> => {
  return sendRequest(url, 'POST', {} , body as BodyInit, file)
}

export const get = (url: string, params: unknown = {} ): Promise<GlobalResponse> => {
  return sendRequest(url, 'GET', params)
}

export const patch = (url: string, body: unknown): Promise<GlobalResponse> => {
  return sendRequest(url, 'PATCH', {},  body as BodyInit)
}
