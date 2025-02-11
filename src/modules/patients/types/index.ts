import dayjs from 'dayjs'

export interface FilterFormValues {
    firstName?: string
    lastName?: string
    dateRange?: [dayjs.Dayjs, dayjs.Dayjs]
    personalNumber?: string
    status?: string
}


