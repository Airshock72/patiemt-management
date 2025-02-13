import { PatientFormValues } from 'api/patients/types.ts'
import { PatientsApi } from 'src/api'
import { useNavigate } from 'react-router-dom'
import { PatientStore, usePatientReducer } from 'src/modules/patients/store/patient.ts'

interface UsePatient {
    state: PatientStore
    createPatient: (values: PatientFormValues) => void
}

const usePatient = (): UsePatient => {
  const [state, dispatch] = usePatientReducer()
  const navigate = useNavigate()

  const createPatient = (values: PatientFormValues) => {
    dispatch({ type: 'SEND_PATIENT_CREATE' })
    const patient = PatientsApi.createPatient(values)
    dispatch({ type: 'DONE_PATIENT_CREATE', payload: patient })
    if (patient) navigate(`/patients/${patient.id}/edit`)
  }

  return { state, createPatient }
}

export default usePatient
