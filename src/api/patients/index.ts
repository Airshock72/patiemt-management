import { Patient, PatientConditionFormValues, PatientFormValues } from 'api/patients/types.ts'
import {
  parseCreatePatientPersonalInfo,
  parseDeletePatient, parseGetPatientCondition,
  parseGetPatientPersonalInfo,
  parsePatients, parseUpdatePatientCondition, parseUpdatePatientPersonalInfo
} from 'api/patients/parsers.ts'
import { ID } from 'api/types/apiGlobalTypes.ts'

export const getPatients = (): Array<Patient> => {
  return parsePatients()
}

export const deletePatient = (key: string): Array<Patient> => {
  return parseDeletePatient(key)
}

export const createPatientPersonalInfo = (values: PatientFormValues): PatientFormValues => {
  return parseCreatePatientPersonalInfo(values)
}

export const getPatientPersonalInfo = (patientId: ID): PatientFormValues => {
  return parseGetPatientPersonalInfo(patientId)
}

export const getPatientCondition = (patientId: ID): PatientConditionFormValues => {
  return parseGetPatientCondition(patientId)
}

export const updatePatientPersonalInfo = (values: PatientFormValues, patientId: ID): PatientFormValues => {
  return parseUpdatePatientPersonalInfo(values, patientId)
}

export const updatePatientCondition = (values: PatientConditionFormValues, patientId: ID): PatientConditionFormValues => {
  return parseUpdatePatientCondition(values, patientId)
}
