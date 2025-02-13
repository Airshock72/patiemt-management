import { Patient, PatientFormValues } from 'api/patients/types.ts'
import { parseDeletePatient, parsePatient, parsePatients } from 'api/patients/parsers.ts'

export const getPatients = (): Array<Patient> => {
  return parsePatients()
}

export const deletePatient = (key: string): Array<Patient> => {
  return parseDeletePatient(key)
}

export const createPatient = (values: PatientFormValues): PatientFormValues => {
  return parsePatient(values)
}
