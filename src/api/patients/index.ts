import { Patient } from 'api/patients/types.ts'
import { parsePatients } from 'api/patients/parsers.ts'

export const getPatients = (): Array<Patient> => {
  return parsePatients()
}
