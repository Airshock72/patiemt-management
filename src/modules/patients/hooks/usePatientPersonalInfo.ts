import { PatientFormValues } from 'api/patients/types.ts'
import { PatientsApi } from 'src/api'
import { useNavigate } from 'react-router-dom'
import { PatientStore, usePatientReducer } from 'src/modules/patients/store/patient.ts'
import { ID } from 'api/types/apiGlobalTypes.ts'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FormInstance } from 'antd/es/form/hooks/useForm'
import useApp from 'antd/es/app/useApp'

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
  onFinish: (values: PatientFormValues, translate:  (key: string, defaultValue: string) => string) => void
}

interface UsePatientProps {
  form: FormInstance<PatientFormValues>
  otpForm: FormInstance<{ otp: string }>
  id?: ID
  isDoctor?: boolean
  isAdminOrDoctor?: boolean
}

const usePatientPersonalInfo = ({ id, isDoctor, form, otpForm, isAdminOrDoctor }: UsePatientProps): UsePatientPersonalInfo => {
  const [state, dispatch] = usePatientReducer()
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isOtpValidated, setIsOtpValidated] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)
  const { notification } = useApp()

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

  const onFinish = (values: PatientFormValues, translate: (key: string, defaultValue: string) => string) => {
    if (!isOtpValidated && !id) {
      form.setFields([
        {
          name: 'phone',
          errors: [`${translate('please_complete_otp_verification', 'გთხოვთ დაასრულოთ OTP ვერიფიკაცია')}!`]
        }
      ])
      return
    }
    notification.success({
      message: `${translate('patient_data', 'პაციენტის მონაცემები')} ${id
        ? translate('updated', 'განახლდა')
        : translate('saved', 'შეინახა')} ${translate('successfully', 'წარმატებით')}!`
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
    if (!isAdminOrDoctor) {
      navigate('/access-denied')
      return
    }
    if (id) {
      getPatient(id)
      return
    }
    if (!isDoctor) {
      navigate('/access-denied')
    }
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
