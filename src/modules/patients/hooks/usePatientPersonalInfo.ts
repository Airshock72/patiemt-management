import { PatientFormValues } from 'api/patients/types.ts'
import { PatientsApi } from 'src/api'
import { useNavigate } from 'react-router-dom'
import { PatientStore, usePatientReducer } from 'src/modules/patients/store/patient.ts'
import { ID } from 'api/types/apiGlobalTypes.ts'
import { useEffect } from 'react'

interface UsePatientPersonalInfo {
  state: PatientStore
  createPatient: (values: PatientFormValues) => void
  updatePatient: (values: PatientFormValues, patientId: ID) => void
}

interface UsePatientProps {
  id?: ID
  isDoctor?: boolean
}

const usePatientPersonalInfo = ({ id, isDoctor }: UsePatientProps): UsePatientPersonalInfo => {
  const [state, dispatch] = usePatientReducer()
  const navigate = useNavigate()

  const getPatient = (patientId: ID) => {
    dispatch({ type: 'SEND_PATIENT_REQUEST' })
    const patient = PatientsApi.getPatientPersonalInfo(patientId)
    dispatch({ type: 'DONE_PATIENT_REQUEST', payload: patient })
  }

  const updatePatient = (values: PatientFormValues, patientId: ID) => {
    dispatch({ type: 'SEND_PATIENT_UPDATE' })
    const patient = PatientsApi.updatePatientPersonalInfo(values, patientId)
    dispatch({ type: 'DONE_PATIENT_UPDATE', payload: patient })
  }

  const createPatient = (values: PatientFormValues) => {
    dispatch({ type: 'SEND_PATIENT_CREATE' })
    const patient = PatientsApi.createPatientPersonalInfo(values)
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
    updatePatient
  }
}

export default usePatientPersonalInfo
