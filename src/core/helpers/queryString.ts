import qs from 'qs'

export const stringify = (params: unknown, options = {}): string => {
  return qs.stringify(params, {
    addQueryPrefix: true,
    format: 'RFC1738',
    encodeValuesOnly: true,
    arrayFormat: 'brackets',
    sort: (a, b) => a.localeCompare(b),
    ...options
  })
}
