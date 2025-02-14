import { ID } from 'api/types/apiGlobalTypes.ts'
import { Dayjs } from 'dayjs'

export interface Patient {
    key: string
    firstName: string
    lastName: string
    personalNumber: string
    addedDate: string
    birthDate: string
    status: PatientStatus
    gender: string | null
    phone: string | null
    country: string | null
    disease: string | null
    symptoms: Array<Symptom>
    financialRegistry: Array<FinancialRegistry>
}

interface Symptom {
    symptomId: string | null
    date: Dayjs
    severity: number
    symptom: string
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

export interface PatientConditionFormValues {
   readonly disease: string | null
   readonly symptoms: Array<Symptom>
}

export interface FinancialRegistry {
    readonly key: string
    readonly service: string
    readonly date: string
    readonly amount: string
}

export enum PatientTabs {
    PERSONAL_INFO = '1',
    CONDITION = '2',
    FINANCIAL_REGISTRY = '3'
}
