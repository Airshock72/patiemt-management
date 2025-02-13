import { PatientFormValues } from 'api/patients/types.ts'
import { PatientsApi } from 'src/api'
import { useNavigate } from 'react-router-dom'
import { PatientStore, usePatientReducer } from 'src/modules/patients/store/patient.ts'
import { ID } from 'api/types/apiGlobalTypes.ts'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface UsePatient {
  state: PatientStore
  createPatient: (values: PatientFormValues) => void
  updatePatient: (values: PatientFormValues, patientId: ID) => void
  setIsModalVisible: Dispatch<SetStateAction<boolean>>
  setIsOtpValidated: Dispatch<SetStateAction<boolean>>
  setIsFormDirty: Dispatch<SetStateAction<boolean>>
  setPhoneNumber: Dispatch<SetStateAction<string>>
  isModalVisible: boolean
  isOtpValidated: boolean
  phoneNumber: string
  isFormDirty: boolean
}

interface UsePatientProps {
  id?: ID
  isDoctor?: boolean
}

const usePatient = ({ id, isDoctor }: UsePatientProps): UsePatient => {
  const [state, dispatch] = usePatientReducer()
  const navigate = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isOtpValidated, setIsOtpValidated] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isFormDirty, setIsFormDirty] = useState(false)

  const getPatient = (patientId: ID) => {
    dispatch({ type: 'SEND_PATIENT_REQUEST' })
    const patient = PatientsApi.getPatient(patientId)
    dispatch({ type: 'DONE_PATIENT_REQUEST', payload: patient })
  }

  const updatePatient = (values: PatientFormValues, patientId: ID) => {
    dispatch({ type: 'SEND_PATIENT_UPDATE' })
    const patient = PatientsApi.updatePatient(values, patientId)
    dispatch({ type: 'DONE_PATIENT_UPDATE', payload: patient })
  }

  const createPatient = (values: PatientFormValues) => {
    dispatch({ type: 'SEND_PATIENT_CREATE' })
    const patient = PatientsApi.createPatient(values)
    dispatch({ type: 'DONE_PATIENT_CREATE', payload: patient })
    if (patient) navigate(`/patients/${patient.id}/edit`)
  }

  useEffect(() => {
    if (id) getPatient(id)
    if (!isDoctor) navigate('/access-denied')
  }, [id])

  return {
    state,
    createPatient,
    updatePatient ,
    isFormDirty,
    isModalVisible,
    isOtpValidated,
    phoneNumber,
    setIsFormDirty,
    setIsModalVisible,
    setIsOtpValidated,
    setPhoneNumber
  }
}

export default usePatient
