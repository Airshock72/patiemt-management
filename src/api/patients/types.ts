import { ID } from 'api/types/apiGlobalTypes.ts'
import { Dayjs } from 'dayjs'

export interface Patient {
    key: string
    firstName: string
    lastName: string
    personalNumber: string
    addedDate: string
    status: PatientStatus
}

export enum PatientStatus {
    ACTIVE = 1,
    INACTIVE = 2
}

export interface PatientFormValues {
    readonly id: ID | null
    readonly firstName: string
    readonly lastName: string
    readonly dob: Dayjs | null
    readonly country: string | null
    readonly gender: string | null
    readonly phone: string | null
}
