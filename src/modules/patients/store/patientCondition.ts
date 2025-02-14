import { PatientConditionFormValues } from 'api/patients/types.ts'
import { Dispatch, useReducer } from 'react'

export interface PatientConditionStore {
    readonly data: PatientConditionFormValues
    readonly isFetching: boolean
    readonly isUpdating: boolean
}

export type SEND_PATIENT_CONDITION_REQUEST = 'SEND_PATIENT_CONDITION_REQUEST'
export type DONE_PATIENT_CONDITION_REQUEST = 'DONE_PATIENT_CONDITION_REQUEST'

export type SEND_PATIENT_CONDITION_UPDATE = 'SEND_PATIENT_CONDITION_UPDATE'
export type DONE_PATIENT_CONDITION_UPDATE = 'DONE_PATIENT_CONDITION_UPDATE'

export type PatientConditionActions =
    | { type: SEND_PATIENT_CONDITION_REQUEST }
    | { type: DONE_PATIENT_CONDITION_REQUEST, readonly payload: PatientConditionFormValues }
    | { type: SEND_PATIENT_CONDITION_UPDATE }
    | { type: DONE_PATIENT_CONDITION_UPDATE, readonly payload: PatientConditionFormValues }

export const initialPatientCondition: PatientConditionFormValues = {
  disease: null,
  symptoms: []
}

const initialPatientConditionStore: PatientConditionStore = {
  data: initialPatientCondition,
  isFetching: false,
  isUpdating: false
}

export const usePatientConditionReducer = () : [PatientConditionStore, Dispatch<PatientConditionActions>] => {
  return useReducer(patientConditionReducer, initialPatientConditionStore)
}

export const patientConditionReducer = (
  state: PatientConditionStore,
  action: PatientConditionActions
): PatientConditionStore => {
  switch (action.type) {
  case 'SEND_PATIENT_CONDITION_REQUEST':
    return {
      ...state,
      isFetching: true
    }
  case 'DONE_PATIENT_CONDITION_REQUEST':
    return {
      ...state,
      data: action.payload || state.data,
      isFetching: false
    }
  case 'SEND_PATIENT_CONDITION_UPDATE':
    return {
      ...state,
      isUpdating: true
    }
  case 'DONE_PATIENT_CONDITION_UPDATE':
    return {
      ...state,
      data: action.payload || state.data,
      isUpdating: false
    }
  default:
    return state
  }
}
