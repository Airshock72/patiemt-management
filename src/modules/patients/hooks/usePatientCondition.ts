import { ID } from 'api/types/apiGlobalTypes.ts'
import { PatientsApi } from 'src/api'
import { PatientConditionStore, usePatientConditionReducer } from 'src/modules/patients/store/patientCondition.ts'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PatientConditionFormValues, PatientFormValues } from 'api/patients/types.ts'
import { NamePath } from 'rc-field-form/es/interface'
import { FormInstance } from 'antd/es/form/hooks/useForm'
import { notification } from 'antd'

interface UsePatientCondition {
  state: PatientConditionStore
  onFieldsChange: (
      isFieldsTouched: ((nameList?: Array<NamePath<PatientFormValues>>, allFieldsTouched?: boolean) => boolean)
          & ((allFieldsTouched?: boolean) => boolean)
  ) => void
  isFormDirty: boolean
  onFinish: (values: PatientConditionFormValues) => void
}

interface UsePatientConditionProps {
  form: FormInstance<PatientConditionFormValues>
  id?: ID
  isDoctor?: boolean
}

const usePatientCondition = ({ id, isDoctor, form }: UsePatientConditionProps): UsePatientCondition => {
  const [state, dispatch] = usePatientConditionReducer()
  const navigate = useNavigate()
  const [isFormDirty, setIsFormDirty] = useState(false)

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

  const onFieldsChange = (
    isFieldsTouched: ((nameList?: NamePath<PatientFormValues>[], allFieldsTouched?: boolean) => boolean)
          & ((allFieldsTouched?: boolean) => boolean)
  ) => {
    const fieldsTouched = isFieldsTouched()
    setIsFormDirty(fieldsTouched)
  }

  const onFinish = (values: PatientConditionFormValues) => {
    if (id) {
      const updatedValues = updatePatientCondition(values, id)
      form.setFieldsValue(updatedValues)
    }
    notification.success({
      message: 'პაციენტის მდგომარეობა წარმატებით!',
      style: {
        backgroundColor: '#f6ffed',
        border: '1px solid #b7eb8f',
        color: '#389e0d'
      }
    })
  }

  useEffect(() => {
    if (id) getPatientCondition(id)
    if (!isDoctor) navigate('/access-denied')
  }, [id])

  useEffect(() => {
    if (state.data && id) {
      form.setFieldsValue(state.data)
      setIsFormDirty(false)
    }
  }, [state.data, id, form])

  useEffect(() => {
    const unsubscribe = form.isFieldsTouched()
    setIsFormDirty(unsubscribe)
  }, [form])

  useEffect(() => {
    if (state.data) {
      form.setFieldsValue(state.data)
    }
  }, [state.data, form])

  return {
    state,
    onFieldsChange,
    isFormDirty,
    onFinish
  }
}

export default usePatientCondition
