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
