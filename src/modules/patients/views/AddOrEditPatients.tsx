import { useState } from 'react'
import { Button, DatePicker, Form, Input, Tabs, TabsProps, Select, Modal } from 'antd'
import { PatientFormValues } from 'api/patients/types.ts'
import usePatient from 'src/modules/patients/hooks/usePatient.ts'

const { Option } = Select

const AddOrEditPatients = () => {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [otpForm] = Form.useForm()
  const [isOtpValidated, setIsOtpValidated] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const hook = usePatient()

  const onFinish = (values: PatientFormValues) => {
    if (!isOtpValidated) {
      form.setFields([
        {
          name: 'phone',
          errors: ['გთხოვთ დაასრულოთ OTP ვერიფიკაცია!']
        }
      ])
      return
    }
    hook.createPatient(values)
  }

  const handleSendCode = () => {
    setIsOtpValidated(false)
    setIsModalVisible(true)
  }

  const handleOk = () => {
    otpForm
      .validateFields()
      .then(() => {
        setIsOtpValidated(true)
        setIsModalVisible(false)
      })
      .catch((error) => console.error(error))
  }

  const handleCancel = () => {
    setIsOtpValidated(false)
    setIsModalVisible(false)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'პაციენტის პირადი ინფორმაცია',
      children: (
        <Form form={form} onFinish={onFinish} layout='vertical'>
          <Form.Item
            label='სახელი'
            name='firstName'
            rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ სახელი!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='გვარი'
            name='lastName'
            rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ გვარი!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='დაბადების თარიღი'
            name='dob'
            rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ დაბადების თარიღი!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label='ქვეყანა'
            name='country'
            rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ ქვეყნის დასახელება!' }]}
          >
            <Select>
              <Option value='Georgia'>საქართველო</Option>
              <Option value='USA'>აშშ</Option>
              <Option value='Canada'>კანადა</Option>
              <Option value='UK'>დიდი ბრიტანეთი</Option>
              <Option value='Australia'>ავსტრალია</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label='სქესი'
            name='gender'
            rules={[{ required: true, message: 'გთხოვთ აირჩიოთ სქესი!' }]}
          >
            <Select>
              <Option value='male'>მამრობითი</Option>
              <Option value='female'>მდედრობითი</Option>
              <Option value='other'>სხვა</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label='ტელეფონის ნომერი'
            name='phone'
            rules={[
              { required: true, message: 'გთხოვთ შეიყვანოთ ტელეფონის ნომერი!' },
              {
                pattern: /^\d{9}$/,
                message: 'ტელეფონის ნომერი უნდა შედგებოდეს 9 ციფრისგან!'
              }
            ]}
          >
            <Input
              type='number'
              onChange={e => setPhoneNumber(e.target.value)}
              addonAfter={
                <Button
                  type='link'
                  onClick={handleSendCode}
                  disabled={phoneNumber.length !== 9}
                >
                   კოდის გაგზავნა
                </Button>
              }
            />
          </Form.Item>
        </Form>
      )
    }
  ]

  return (
    <div className='p-4'>
      <Tabs defaultActiveKey='1' items={items} />
      <div className='mt-4'>
        <Button type='primary' htmlType='submit' onClick={() => form.submit()}>
            პაციენტის შენახვა
        </Button>
      </div>
      <Modal
        title='OTP ვერიფიკაცია'
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={otpForm}>
          <Form.Item
            label='OTP კოდი'
            name='otp'
            rules={[
              { required: true, message: 'გთხოვთ შეიყვანოთ OTP კოდი!' },
              {
                pattern: /^\d{6}$/,
                message: 'OTP უნდა შედგებოდეს 6 ციფრისგან!'
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddOrEditPatients
