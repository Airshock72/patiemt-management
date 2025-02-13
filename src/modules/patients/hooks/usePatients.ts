import { useEffect, useState } from 'react'
import { FilterFormValues } from 'src/modules/patients/types'
import dayjs from 'dayjs'
import { FormInstance, Modal } from 'antd'
import { PatientsStore, usePatientsReducer } from 'src/modules/patients/store/patients.ts'
import { PatientsApi } from '../../../api'
import { Patient } from 'api/patients/types.ts'

interface UsePatients {
  state: PatientsStore
  onFinish: (values: FilterFormValues) => void
  handleDelete: (record: Patient) => void
}

interface UsePatientsProps {
  form: FormInstance<FilterFormValues>
}

const usePatients = ({ form }: UsePatientsProps): UsePatients => {
  const [, setFilterValues] = useState<FilterFormValues>({})
  const [state, dispatch] = usePatientsReducer()

  const getPatients = (filters: FilterFormValues) => {
    dispatch({ type: 'SEND_PATIENTS_REQUEST' })
    const patients = PatientsApi.getPatients()
    const filteredPatients = applyFilters(patients, filters)
    dispatch({ type: 'DONE_PATIENTS_REQUEST', payload: filteredPatients })
  }

  const handleDelete = (record: Patient) => {
    Modal.confirm({
      title: 'დარწმუნებული ხართ რომ წაშალოთ ეს ჩანაწერი?',
      content: 'პროცესს უკან ვერ დააბრუნებთ.',
      okText: 'დიახ',
      okType: 'danger',
      cancelText: 'არა',
      onOk() { onDelete(record.key) }
    })
  }

  const onDelete = (key: string) => {
    const patients = PatientsApi.deletePatient(key)
    dispatch({ type: 'DELETE_PATIENT', payload: patients })
  }

  const applyFilters = (
    patients: Array<Patient>,
    filters: FilterFormValues
  ) => {
    const isAllFiltersEmpty = Object.values(filters).every(
      (value) =>
        value === undefined ||
            value === '' ||
            (Array.isArray(value) && value.length === 0)
    )

    if (isAllFiltersEmpty) {
      return patients
    }

    return patients.filter((patient) => {
      return (
        (!filters.firstName ||
              patient.firstName.toLowerCase().includes(filters.firstName.toLowerCase())) &&
          (!filters.lastName ||
              patient.lastName.toLowerCase().includes(filters.lastName.toLowerCase())) &&
        (!filters.personalNumber ||
            patient.personalNumber.includes(filters.personalNumber.toString())) &&
          (!filters.status || patient.status === Number(filters.status)) &&
          (!filters.dateRange ||
              (dayjs(patient.addedDate).isAfter(filters.dateRange[0]) &&
                  dayjs(patient.addedDate).isBefore(filters.dateRange[1])))
      )
    })
  }

  const saveFilters = (values: FilterFormValues) => {
    localStorage.setItem('patientFilters', JSON.stringify(values))
    setFilterValues(values)
  }

  const onFinish = (values: FilterFormValues) => {
    saveFilters(values)
    getPatients(values)
  }

  useEffect(() => {
    const savedFilters = localStorage.getItem('patientFilters')
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters)
      setFilterValues(parsedFilters)
      form.setFieldsValue({
        ...parsedFilters,
        dateRange: parsedFilters.dateRange
          ? [
            dayjs(parsedFilters.dateRange[0]),
            dayjs(parsedFilters.dateRange[1])
          ]
          : undefined
      })
      getPatients(parsedFilters)
    } else {
      getPatients({})
    }
  }, [form])

  return { state, onFinish, handleDelete }
}

export default usePatients
