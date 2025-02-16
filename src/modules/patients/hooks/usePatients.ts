import { useEffect, useState } from 'react'
import { FilterFormValues } from 'src/modules/patients/types'
import dayjs from 'dayjs'
import { Form, FormInstance } from 'antd'
import { PatientsStore, usePatientsReducer } from 'src/modules/patients/store/patients.ts'
import { PatientsApi } from '../../../api'
import { Patient } from 'api/patients/types.ts'
import useApp from 'antd/es/app/useApp'

interface UsePatients {
  state: PatientsStore
  onFinish: (values: FilterFormValues) => void
  handleDelete: (record: Patient, translate: (key: string, defaultValue: string) => string) => void
  handleClearFilters: () => void
  isFilterActive: boolean
}

interface UsePatientsProps {
  form: FormInstance<FilterFormValues>
}

const usePatients = ({ form }: UsePatientsProps): UsePatients => {
  const [, setFilterValues] = useState<FilterFormValues>({})
  const [state, dispatch] = usePatientsReducer()
  const { modal, notification } = useApp()
  const [isFilterActive, setIsFilterActive] = useState(false)
  const formValues = Form.useWatch([], form)

  const getPatients = (filters: FilterFormValues) => {
    dispatch({ type: 'SEND_PATIENTS_REQUEST' })
    const patients = PatientsApi.getPatients()
    const filteredPatients = applyFilters(patients, filters)
    dispatch({ type: 'DONE_PATIENTS_REQUEST', payload: filteredPatients })
  }

  const handleDelete = (record: Patient, translate: (key: string, defaultValue: string) => string) => {
    modal.confirm({
      title: `${translate('are_you_sure_delete_this_entry', 'დარწმუნებული ხართ რომ წაშალოთ ეს ჩანაწერი')}?`,
      content: `${translate('you_can_not_reverse_the_process', 'პროცესს უკან ვერ დააბრუნებთ')}.`,
      okText: translate('yes', 'დიახ'),
      okType: 'danger',
      cancelText: translate('no', 'არა'),
      onOk() { onDelete(record.key, translate) }
    })
  }

  const onDelete = (key: string, translate: (key: string, defaultValue: string) => string) => {
    const patients = PatientsApi.deletePatient(key)
    dispatch({ type: 'DELETE_PATIENT', payload: patients })
    notification.success({
      message: `${translate('patient_data_deleted_successfully', 'პაციენტის მონაცემები წაიშალა წარმატებით')}!`
    })
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

    if (isAllFiltersEmpty) return patients

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

  const handleClearFilters = () => {
    form.resetFields()
    getPatients({})
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

  useEffect(() => {
    const isActive = Object.values(formValues || {}).some(
      (value) => value !== undefined && value !== '' && value !== null
    )
    setIsFilterActive(isActive)
  }, [formValues])

  return { state, onFinish, handleDelete, handleClearFilters, isFilterActive }
}

export default usePatients
