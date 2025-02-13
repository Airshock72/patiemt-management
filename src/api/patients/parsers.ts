import {
  Patient,
  PatientFormValues,
  PatientStatus
} from 'api/patients/types.ts'
import { transformDate } from 'api/parsers/parsers.ts'
import { ID } from 'api/types/apiGlobalTypes.ts'
import { initialPatient } from 'src/modules/patients/store/patient.ts'
import dayjs, { Dayjs } from 'dayjs'

export const parsePatients = (): Array<Patient> => {
  const patients = localStorage.getItem('patients')
  if (patients !== null) return JSON.parse(patients)
  const staticPatients = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Doe',
      personalNumber: '123456789',
      addedDate: '2021-05-15',
      birthDate: '2021-05-15',
      status: PatientStatus.ACTIVE,
      country: null,
      gender: null,
      phone: null
    },
    {
      key: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      personalNumber: '987654321',
      addedDate: '2022-03-10',
      birthDate: '2022-03-10',
      status: PatientStatus.INACTIVE,
      country: null,
      gender: null,
      phone: null
    },
    {
      key: '3',
      firstName: 'Ana',
      lastName: 'Smith',
      personalNumber: '26443746352',
      addedDate: '2025-01-12',
      birthDate: '2025-01-12',
      status: PatientStatus.ACTIVE,
      country: null,
      gender: null,
      phone: null
    },
    {
      key: '4',
      firstName: 'Bella',
      lastName: 'James',
      personalNumber: '9887876543',
      addedDate: '2025-01-12',
      birthDate: '2025-01-12',
      status: PatientStatus.INACTIVE,
      country: null,
      gender: null,
      phone: null
    },
    {
      key: '5',
      firstName: 'Luanna',
      lastName: 'Xochipilli',
      personalNumber: '23456543456',
      addedDate: '2025-10-05',
      birthDate: '2025-10-05',
      status: PatientStatus.INACTIVE,
      country: null,
      gender: null,
      phone: null
    },
    {
      key: '6',
      firstName: 'Akmal',
      lastName: 'Philomel',
      personalNumber: '98767656543',
      addedDate: '2026-11-04',
      birthDate: '2026-11-04',
      status: PatientStatus.ACTIVE,
      country: null,
      gender: null,
      phone: null
    }
  ]
  localStorage.setItem('patients', JSON.stringify(staticPatients))
  return staticPatients
}

export const parseDeletePatient = (key: string): Array<Patient> => {
  const patients = localStorage.getItem('patients')
  if (patients === null) return []
  const parsedPatients: Array<Patient> = JSON.parse(patients)
  const filteredPatients = parsedPatients.filter((el) => el.key !== key)
  localStorage.setItem('patients', JSON.stringify(filteredPatients))
  return filteredPatients
}

export const parseCreatePatient = (values: PatientFormValues): PatientFormValues => {
  const patientData = {
    country: values.country,
    gender: values.gender,
    lastName: values.lastName,
    firstName: values.firstName,
    id: Date.now() + '-' + Math.floor(Math.random() * 10000),
    dob: values.dob,
    phone: values.phone
  }

  const patients = localStorage.getItem('patients')
  const parsedPatients = JSON.parse(patients as string) //as string because, when I log in, I have always patients listing
  parsedPatients.unshift({
    key: patientData.id,
    gender: patientData.gender,
    phone: patientData.phone,
    country: patientData.country,
    status: PatientStatus.ACTIVE,
    firstName: patientData.firstName,
    lastName: patientData.lastName,
    personalNumber: `${Math.floor(Math.random() * 100000000000)}`,
    birthDate: patientData.dob !== null
      ? transformDate(patientData.dob.toDate())
      : '',
    addedDate: new Date().toISOString().split('T')[0]
  })

  localStorage.setItem('patients', JSON.stringify(parsedPatients))

  return patientData
}

export const parseGetPatient = (patientId: ID): PatientFormValues => {
  const patients = localStorage.getItem('patients')
  if (patients === null) return initialPatient
  const parsedPatients: Array<Patient> = JSON.parse(patients)
  const foundItem = parsedPatients.find((el) => el.key === patientId)
  if (!foundItem) return initialPatient
  return {
    id: foundItem.key,
    firstName: foundItem.firstName,
    lastName: foundItem.lastName,
    phone: foundItem.phone,
    country: foundItem.country,
    gender: foundItem.gender,
    dob: dayjs(foundItem.birthDate)
  }
}

export const parseUpdatePatient = (values: PatientFormValues, patientId: ID): PatientFormValues => {
  const patients = localStorage.getItem('patients')
  if (patients === null) return values

  const parsedPatients: Array<Patient> = JSON.parse(patients)
  const foundItem: Patient | undefined = parsedPatients.find(el => el.key === patientId)
  if (!foundItem) return values

  const patientFormValue: PatientFormValues = {
    id: patientId,
    firstName: values.firstName,
    lastName: values.lastName,
    phone: values.phone,
    country: values.country,
    gender: values.gender,
    dob: dayjs(values.dob)
  }

  const updatedPatient = {
    key: patientId,
    birthDate: transformDate((patientFormValue.dob as Dayjs).toDate()),
    gender: patientFormValue.gender,
    country: patientFormValue.country,
    phone: patientFormValue.phone,
    lastName: patientFormValue.lastName,
    firstName: patientFormValue.firstName,
    addedDate: foundItem.addedDate,
    status: foundItem.status,
    personalNumber: foundItem.personalNumber
  }

  parsedPatients.splice(parsedPatients.indexOf(foundItem), 1, updatedPatient)

  localStorage.setItem('patients', JSON.stringify(parsedPatients))

  return patientFormValue
}
