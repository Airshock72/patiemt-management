import { PatientFormValues } from 'api/patients/types.ts'
import { Dispatch, useReducer } from 'react'

export interface PatientStore {
    readonly data: PatientFormValues
    readonly isCreating: boolean
}

export type SEND_PATIENT_CREATE = 'SEND_PATIENT_CREATE'
export type DONE_PATIENT_CREATE = 'DONE_PATIENT_CREATE'

export type PatientActions =
    | { type: SEND_PATIENT_CREATE }
    | { type: DONE_PATIENT_CREATE, readonly payload: PatientFormValues }

const initialPatient: PatientFormValues = {
  firstName: '',
  lastName: '',
  phone: null,
  id: null,
  country: null,
  gender: null,
  dob: null
}

const initialPatientState: PatientStore = {
  data: initialPatient,
  isCreating: false
}

export const usePatientReducer = (): [PatientStore, Dispatch<PatientActions>] => {
  return useReducer(patientReducer, initialPatientState)
}

export const patientReducer = (state: PatientStore, action: PatientActions): PatientStore => {
  switch (action.type) {
  case 'SEND_PATIENT_CREATE':
    return {
      ...state,
      isCreating: true
    }
  case 'DONE_PATIENT_CREATE':
    return {
      ...state,
      isCreating: false,
      data: action.payload || state.data
    }
  default:
    return state
  }
}
