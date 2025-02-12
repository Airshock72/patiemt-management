import { Patient } from 'api/patients/types.ts'

export const parsePatients = (): Array<Patient> => {
  return [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Doe',
      personalNumber: '123456789',
      addedDate: '2021-05-15',
      status: 'Active'
    },
    {
      key: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      personalNumber: '987654321',
      addedDate: '2022-03-10',
      status: 'Inactive'
    },
    {
      key: '3',
      firstName: 'Ana',
      lastName: 'Smith',
      personalNumber: '26443746352',
      addedDate: '2025-01-12',
      status: 'Inactive'
    },
    {
      key: '4',
      firstName: 'Bella',
      lastName: 'James',
      personalNumber: '9887876543',
      addedDate: '2025-01-12',
      status: 'Active'
    },
    {
      key: '5',
      firstName: 'Luanna',
      lastName: 'Xochipilli',
      personalNumber: '23456543456',
      addedDate: '2025-10-05',
      status: 'Inactive'
    },
    {
      key: '6',
      firstName: 'Akmal',
      lastName: 'Philomel',
      personalNumber: '98767656543',
      addedDate: '2026-11-04',
      status: 'Active'
    }
  ]
}
