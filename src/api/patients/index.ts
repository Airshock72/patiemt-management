import { Patient, PatientFormValues } from 'api/patients/types.ts'
import {
  parseCreatePatient,
  parseDeletePatient,
  parseGetPatient,
  parsePatients, parseUpdatePatient
} from 'api/patients/parsers.ts'
import { ID } from 'api/types/apiGlobalTypes.ts'

export const getPatients = (): Array<Patient> => {
  return parsePatients()
}

export const deletePatient = (key: string): Array<Patient> => {
  return parseDeletePatient(key)
}

export const createPatient = (values: PatientFormValues): PatientFormValues => {
  return parseCreatePatient(values)
}

export const getPatient = (patientId: ID): PatientFormValues => {
  return parseGetPatient(patientId)
}

export const updatePatient = (values: PatientFormValues, patientId: ID): PatientFormValues => {
  return parseUpdatePatient(values, patientId)
}
