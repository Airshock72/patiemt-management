import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd'
import usePatientPersonalInfo from 'src/modules/patients/hooks/usePatientPersonalInfo.ts'
import { useParams } from 'react-router-dom'
import { useAuth } from 'src/providers/AuthProvider.tsx'
import { UserRole } from 'api/auth/types.ts'
import { useTranslation } from 'src/providers/TranslationProvider.tsx'

const { Option } = Select

const PersonalInfo = () => {
  const [form] = Form.useForm()
  const params = useParams()
  const patientId = params.id
  const { getAuthUser } = useAuth()
  const user = getAuthUser()
  const isDoctor = user && user.roles === undefined ? false : user?.roles.includes(UserRole.DOCTOR)
  const {
    onFinish,
    setPhoneNumber,
    isModalVisible,
    handleOk,
    onFieldsChange,
    handleSendCode,
    handleCancel,
    isFormDirty,
    phoneNumber,
    state
  } = usePatientPersonalInfo({ id: patientId, isDoctor, form })
  const [otpForm] = Form.useForm()
  const { translate } = useTranslation()

  return (
    <>
      <Form
        form={form}
        onFinish={values => onFinish(values)}
        layout='vertical'
        initialValues={state.data}
        onFieldsChange={() => onFieldsChange()}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={translate('firstname', 'სახელი')}
              name='firstName'
              rules={[{ required: true, message: `${translate('please_enter_firstname', 'გთხოვთ შეიყვანოთ სახელი')}!` }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={translate('lastname', 'გვარი')}
              name='lastName'
              rules={[{ required: true, message: `${translate('please_enter_lastname', 'გთხოვთ შეიყვანოთ გვარი')}!` }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={translate('birth_date', 'დაბადების თარიღი')}
              name='dob'
              rules={[{ required: true, message: `${translate('please_enter_birth_date', 'გთხოვთ შეიყვანოთ დაბადების თარიღი')}!` }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={translate('country', 'ქვეყანა')}
              name='country'
              rules={[{ required: true, message: `${translate('please_enter_country_name', 'გთხოვთ შეიყვანოთ ქვეყნის დასახელება')}!` }]}
            >
              <Select>
                <Option value='Georgia'>{translate('georgia', 'საქართველო')}</Option>
                <Option value='USA'>{translate('usa', 'აშშ')}</Option>
                <Option value='Canada'>{translate('canada', 'კანადა')}</Option>
                <Option value='UK'>{translate('great_britain', 'დიდი ბრიტანეთი')}</Option>
                <Option value='Australia'>{translate('australia', 'ავსტრალია')}</Option>
                <Option value='Spain'>{translate('spain', 'ესპანეთი')}</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={translate('gender', 'სქესი')}
              name='gender'
              rules={[{ required: true, message: `${translate('please_choose_gender', 'გთხოვთ აირჩიოთ სქესი')}!` }]}
            >
              <Select>
                <Option value='male'>{translate('male', 'მამრობითი')}</Option>
                <Option value='female'>{translate('female', 'მდედრობითი')}</Option>
                <Option value='other'>{translate('other', 'სხვა')}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={translate('phone_number', 'ტელეფონის ნომერი')}
              name='phone'
              rules={[
                { required: true, message: `${translate('please_enter_phone_number', 'გთხოვთ შეიყვანოთ ტელეფონის ნომერი')}!` },
                {
                  pattern: /^\d{9}$/,
                  message: `${translate('phone_number_must_consist_9_digit', 'ტელეფონის ნომერი უნდა შედგებოდეს 9 ციფრისგან')}!`
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
                    {translate('send_code', 'კოდის გაგზავნა')}
                  </Button>
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className='mt-4'>
        <Button
          type='primary'
          htmlType='submit'
          onClick={() => form.submit()}
          disabled={patientId ? !isFormDirty : false}
        >
          {translate('patient\'s', 'პაციენტის')} {patientId
            ? translate('update', 'განახლება')
            : translate('save', 'შენახვა')}
        </Button>
      </div>
      <Modal
        title={`OTP ${translate('verification', 'ვერიფიკაცია')}`}
        open={isModalVisible}
        onOk={() => handleOk()}
        onCancel={handleCancel}
      >
        <Form form={otpForm}>
          <Form.Item
            label={`OTP ${translate('code', 'კოდი')}`}
            name='otp'
            rules={[
              { required: true, message: `${translate('please_enter_otp_code', 'გთხოვთ შეიყვანოთ OTP კოდი')}!` },
              {
                pattern: /^\d{6}$/,
                message: `${translate('otp_must_consist_6_digits', 'OTP უნდა შედგებოდეს 6 ციფრისგან')}!`
              }
            ]}
          >
            <Input type='number' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default PersonalInfo
