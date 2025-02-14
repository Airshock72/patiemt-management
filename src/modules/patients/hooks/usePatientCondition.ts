import { ID } from 'api/types/apiGlobalTypes.ts'
import { PatientsApi } from 'src/api'
import { PatientConditionStore, usePatientConditionReducer } from 'src/modules/patients/store/patientCondition.ts'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PatientConditionFormValues } from 'api/patients/types.ts'

interface UsePatientCondition {
    state: PatientConditionStore
  updatePatientCondition: (values: PatientConditionFormValues, patientId: ID) => PatientConditionFormValues
}

interface UsePatientConditionProps {
    id?: ID
    isDoctor?: boolean
}

const usePatientCondition = ({ id, isDoctor }: UsePatientConditionProps): UsePatientCondition => {
  const [state, dispatch] = usePatientConditionReducer()
  const navigate = useNavigate()

  const getPatientCondition = (patientId: ID) => {
    dispatch({ type: 'SEND_PATIENT_CONDITION_REQUEST' })
    const patient = PatientsApi.getPatientCondition(patientId)
    dispatch({ type: 'DONE_PATIENT_CONDITION_REQUEST', payload: patient })
  }

  const updatePatientCondition = (values: PatientConditionFormValues, patientId: ID) => {
    dispatch({ type: 'SEND_PATIENT_CONDITION_UPDATE' })
    const patient = PatientsApi.updatePatientCondition(values, patientId)
    dispatch({ type: 'DONE_PATIENT_CONDITION_UPDATE', payload: patient })
    return patient
  }

  useEffect(() => {
    if (id) getPatientCondition(id)
    if (!isDoctor) navigate('/access-denied')
  }, [id])

  return {
    state,
    updatePatientCondition
  }
}

export default usePatientCondition
