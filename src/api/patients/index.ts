import { Patient, PatientFormValues } from 'api/patients/types.ts'
import { parsePatient, parsePatients } from 'api/patients/parsers.ts'

export const getPatients = (): Array<Patient> => {
  return parsePatients()
}

export const createPatient = (values: PatientFormValues): PatientFormValues => {
  return parsePatient(values)
}
