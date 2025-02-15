import { PatientFormValues } from 'api/patients/types.ts'
import { PatientsApi } from 'src/api'
import { useNavigate } from 'react-router-dom'
import { PatientStore, usePatientReducer } from 'src/modules/patients/store/patient.ts'
import { ID } from 'api/types/apiGlobalTypes.ts'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FormInstance } from 'antd/es/form/hooks/useForm'
import { notification } from 'antd'

interface UsePatientPersonalInfo {
  state: PatientStore
  setPhoneNumber: Dispatch<SetStateAction<string>>
  phoneNumber: string
  isModalVisible: boolean
  isFormDirty: boolean
  handleSendCode: () => void
  handleCancel: () => void
  onFieldsChange: () => void
  handleOk: () => void
  onFinish: (values: PatientFormValues) => void
}

interface UsePatientProps {
  form: FormInstance<PatientFormValues>
  otpForm: FormInstance<{ otp: string }>
  id?: ID
  isDoctor?: boolean
}

const usePatientPersonalInfo = ({ id, isDoctor, form, otpForm }: UsePatientProps): UsePatientPersonalInfo => {
  const [state, dispatch] = usePatientReducer()
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isOtpValidated, setIsOtpValidated] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

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

  const handleSendCode = () => {
    setIsOtpValidated(false)
    setIsModalVisible(true)
  }

  const onFinish = (values: PatientFormValues) => {
    if (!isOtpValidated && !id) {
      form.setFields([
        {
          name: 'phone',
          errors: ['გთხოვთ დაასრულოთ OTP ვერიფიკაცია!']
        }
      ])
      return
    }
    notification.success({
      message: `პაციენტის მონაცემები ${id ? 'განახლდა' : 'შეინახა '} წარმატებით!`,
      style: {
        backgroundColor: '#f6ffed',
        border: '1px solid #b7eb8f',
        color: '#389e0d'
      }
    })
    return id ? updatePatient(values, id) : createPatient(values)
  }

  const handleOk = () => {
    otpForm.validateFields()
      .then(() => {
        setIsOtpValidated(true)
        setIsModalVisible(false)
      })
      .catch((error) => console.error(error))
  }

  const onFieldsChange = () => {
    const fieldsTouched = form.isFieldsTouched()
    setIsFormDirty(fieldsTouched)
  }

  const handleCancel = () => {
    setIsOtpValidated(false)
    setIsModalVisible(false)
  }

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
    if (id) getPatient(id)
    if (!isDoctor) navigate('/access-denied')
  }, [id])

  return {
    state,
    handleCancel,
    setPhoneNumber,
    isModalVisible,
    phoneNumber,
    isFormDirty,
    handleSendCode,
    onFinish,
    handleOk,
    onFieldsChange
  }
}

export default usePatientPersonalInfo
