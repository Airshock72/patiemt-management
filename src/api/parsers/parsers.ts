import { format } from 'date-fns'

export const transformDate = (dateTime: Date, dateFormat?: string): string => {
  if (!dateTime)  return ''
  const formatStyle = dateFormat ?? 'yyyy-MM-dd'
  return format(new Date(dateTime), formatStyle)
}
