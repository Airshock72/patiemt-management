import { PatientFormValues } from 'api/patients/types.ts'
import { Dispatch, useReducer } from 'react'

export interface PatientStore {
    readonly data: PatientFormValues
    readonly isCreating: boolean
    readonly isFetching: boolean
    readonly isUpdating: boolean
}

export type SEND_PATIENT_CREATE = 'SEND_PATIENT_CREATE'
export type DONE_PATIENT_CREATE = 'DONE_PATIENT_CREATE'

export type SEND_PATIENT_UPDATE = 'SEND_PATIENT_UPDATE'
export type DONE_PATIENT_UPDATE = 'DONE_PATIENT_UPDATE'

export type SEND_PATIENT_REQUEST = 'SEND_PATIENT_REQUEST'
export type DONE_PATIENT_REQUEST = 'DONE_PATIENT_REQUEST'

export type PatientActions =
    | { type: SEND_PATIENT_CREATE }
    | { type: DONE_PATIENT_CREATE, readonly payload: PatientFormValues }
    | { type: SEND_PATIENT_UPDATE }
    | { type: DONE_PATIENT_UPDATE, readonly payload: PatientFormValues }
    | { type: SEND_PATIENT_REQUEST }
    | { type: DONE_PATIENT_REQUEST, readonly payload: PatientFormValues }

export const initialPatient: PatientFormValues = {
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
  isCreating: false,
  isFetching: false,
  isUpdating: false
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
  case 'SEND_PATIENT_UPDATE':
    return {
      ...state,
      isUpdating: true
    }
  case 'DONE_PATIENT_UPDATE':
    return {
      ...state,
      isUpdating: false,
      data: action.payload || state.data
    }
  case 'SEND_PATIENT_REQUEST':
    return {
      ...state,
      isFetching: true
    }
  case 'DONE_PATIENT_REQUEST':
    return {
      ...state,
      isFetching: false,
      data: action.payload
    }
  default:
    return state
  }
}
