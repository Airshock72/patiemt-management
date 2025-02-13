import { Patient, PatientFormValues, PatientStatus } from 'api/patients/types.ts'

export const parsePatients = (): Array<Patient> => {
  return [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Doe',
      personalNumber: '123456789',
      addedDate: '2021-05-15',
      status: PatientStatus.ACTIVE
    },
    {
      key: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      personalNumber: '987654321',
      addedDate: '2022-03-10',
      status: PatientStatus.INACTIVE
    },
    {
      key: '3',
      firstName: 'Ana',
      lastName: 'Smith',
      personalNumber: '26443746352',
      addedDate: '2025-01-12',
      status: PatientStatus.ACTIVE
    },
    {
      key: '4',
      firstName: 'Bella',
      lastName: 'James',
      personalNumber: '9887876543',
      addedDate: '2025-01-12',
      status: PatientStatus.INACTIVE
    },
    {
      key: '5',
      firstName: 'Luanna',
      lastName: 'Xochipilli',
      personalNumber: '23456543456',
      addedDate: '2025-10-05',
      status: PatientStatus.INACTIVE
    },
    {
      key: '6',
      firstName: 'Akmal',
      lastName: 'Philomel',
      personalNumber: '98767656543',
      addedDate: '2026-11-04',
      status: PatientStatus.ACTIVE
    }
  ]
}

export const parsePatient = (values: PatientFormValues): PatientFormValues => {
  return {
    country: values.country,
    gender: values.gender,
    lastName: values.lastName,
    firstName: values.firstName,
    id: Date.now() + '-' + Math.floor(Math.random() * 10000),
    dob: values.dob,
    phone: values.phone
  }
}
