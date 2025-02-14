import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { PatientFormValues } from 'api/patients/types.ts'
import { FieldData, NamePath, ValidateOptions } from 'rc-field-form/es/interface'
import { notification } from 'antd'
import { ID } from 'api/types/apiGlobalTypes'
import { FormInstance } from 'antd/es/form/hooks/useForm'

interface UsePersonalInfo {
    setPhoneNumber: Dispatch<SetStateAction<string>>
    phoneNumber: string
    isModalVisible: boolean
    isFormDirty: boolean
    handleSendCode: () => void
    handleCancel: () => void
    handleOk: (validateFields: (opt?: ValidateOptions) => Promise<PatientFormValues>) => void
    onFieldsChange: (
        isFieldsTouched: ((nameList?: Array<NamePath<PatientFormValues>>, allFieldsTouched?: boolean) => boolean)
            & ((allFieldsTouched?: boolean) => boolean)
    ) => void
    onFinish: (
        values: PatientFormValues,
        setFields: (fields: Array<FieldData<PatientFormValues>>) => void,
        createPatient: (values: PatientFormValues) => void,
        updatePatient: (values: PatientFormValues, patientId: ID) => void,
        patientId?: ID
    ) => void
}

interface UsePersonalInfoProps {
    form: FormInstance<PatientFormValues>
    stateData: PatientFormValues
    patientId?: ID
}

const usePersonalInfo = (
  { form, patientId, stateData }: UsePersonalInfoProps
): UsePersonalInfo => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isOtpValidated, setIsOtpValidated] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false)

  const handleSendCode = () => {
    setIsOtpValidated(false)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsOtpValidated(false)
    setIsModalVisible(false)
  }

  const handleOk = (validateFields: (opt?: ValidateOptions) => Promise<PatientFormValues>) => {
    validateFields()
      .then(() => {
        setIsOtpValidated(true)
        setIsModalVisible(false)
      })
      .catch((error) => console.error(error))
  }

  const onFieldsChange = (
    isFieldsTouched: ((nameList?: NamePath<PatientFormValues>[], allFieldsTouched?: boolean) => boolean)
     & ((allFieldsTouched?: boolean) => boolean)
  ) => {
    const fieldsTouched = isFieldsTouched()
    setIsFormDirty(fieldsTouched)
  }

  const onFinish = (
    values: PatientFormValues,
    setFields: (fields: FieldData<PatientFormValues>[]) => void,
    createPatient: (values: PatientFormValues) => void,
    updatePatient: (values: PatientFormValues, patientId: ID) => void,
    patientId?: ID
  ) => {
    if (!isOtpValidated && !patientId) {
      setFields([
        {
          name: 'phone',
          errors: ['გთხოვთ დაასრულოთ OTP ვერიფიკაცია!']
        }
      ])
      return
    }
    notification.success({
      message: `პაციენტის მონაცემები ${patientId ? 'განახლდა' : 'შეინახა '} წარმატებით!`,
      style: {
        backgroundColor: '#f6ffed',
        border: '1px solid #b7eb8f',
        color: '#389e0d'
      }
    })
    return patientId ? updatePatient(values, patientId) : createPatient(values)
  }

  useEffect(() => {
    if (stateData && patientId) {
      form.setFieldsValue(stateData)
      setIsFormDirty(false)
    }
  }, [stateData, patientId, form])

  useEffect(() => {
    const unsubscribe = form.isFieldsTouched()
    setIsFormDirty(unsubscribe)
  }, [form])

  return {
    setPhoneNumber,
    isModalVisible,
    phoneNumber,
    isFormDirty,
    handleSendCode,
    handleCancel,
    handleOk,
    onFieldsChange,
    onFinish
  }
}

export default usePersonalInfo
