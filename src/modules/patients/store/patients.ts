import { Patient } from 'api/patients/types.ts'
import { Dispatch, useReducer } from 'react'

export interface PatientsStore {
    readonly data: Array<Patient>
    readonly isFetching: boolean
}

export type SEND_PATIENTS_REQUEST = 'SEND_PATIENTS_REQUEST'
export type DONE_PATIENTS_REQUEST = 'DONE_PATIENTS_REQUEST'

export type DELETE_PATIENT = 'DELETE_PATIENT'

export type SEND_FILTERED_PATIENTS_UPDATE = 'SEND_FILTERED_PATIENTS_UPDATE'

export type SET_FILTERED_PATIENTS = 'SET_FILTERED_PATIENTS'

export type PatientsActions =
    | { type: 'SEND_PATIENTS_REQUEST' }
    | { type: 'DONE_PATIENTS_REQUEST', readonly payload: Array<Patient> | null }
    | { type: 'SEND_FILTERED_PATIENTS_UPDATE', readonly payload: Array<Patient> }
    | { type: 'SET_FILTERED_PATIENTS', readonly payload: Array<Patient> }
    | { type: 'DELETE_PATIENT', readonly payload: Array<Patient> }

const initialPatients: PatientsStore = {
  data: [],
  isFetching: false
}

export const usePatientsReducer = (): [PatientsStore, Dispatch<PatientsActions>] => {
  return useReducer(patientsReducer, initialPatients)
}

export const patientsReducer = (state: PatientsStore, action: PatientsActions): PatientsStore => {
  switch (action.type) {
  case 'SEND_PATIENTS_REQUEST':
    return {
      ...state,
      isFetching: true
    }
  case 'DONE_PATIENTS_REQUEST':
    return {
      ...state,
      data: action.payload || state.data,
      isFetching: false
    }
  case 'SEND_FILTERED_PATIENTS_UPDATE':
    return {
      ...state,
      data: action.payload || state.data
    }
  case 'SET_FILTERED_PATIENTS':
    return {
      ...state,
      data: action.payload || state.data
    }
  case 'DELETE_PATIENT':
    return {
      ...state,
      data: action.payload
    }
  default:
    return state
  }
}
