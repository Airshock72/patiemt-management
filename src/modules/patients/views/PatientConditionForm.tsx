import { Form, Select, Input, Button, Slider, DatePicker, Row, Col, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import usePatientCondition from 'src/modules/patients/hooks/usePatientCondition.ts'
import { useParams } from 'react-router-dom'
import { useAuth } from 'src/providers/AuthProvider.tsx'
import { UserRole } from 'api/auth/types'
import { useTranslation } from 'src/providers/TranslationProvider.tsx'

const { Option } = Select

const PatientConditionForm = () => {
  const [form] = Form.useForm()
  const params = useParams()
  const patientId = params.id
  const { getAuthUser } = useAuth()
  const user = getAuthUser()
  const { translate } = useTranslation()
  const isDoctor = user && user.roles === undefined ? false : user?.roles.includes(UserRole.DOCTOR)
  const {
    state,
    isFormDirty,
    onFieldsChange,
    onFinish
  } = usePatientCondition({ id: patientId, isDoctor, form })

  return (
    <Form
      onFinish={values => onFinish(values)}
      layout='vertical'
      form={form}
      initialValues={state.data}
      onFieldsChange={() => onFieldsChange(form.isFieldsTouched)}
    >
      <Form.Item
        label={translate('disease', 'დაავადება')}
        name='disease'
        rules={[{ required: true, message: `${translate('please_choose_disease', 'გთხოვთ აირჩიოთ დაავადება')}` }]}
      >
        <Select placeholder={translate('choose_disease', 'აირჩიეთ დაავადება')}>
          <Option value='flu'>{translate('flu', 'გრიპი')}</Option>
          <Option value='cold'>{translate('cold', 'გაციება')}</Option>
          <Option value='covid'>COVID-19</Option>
          <Option value='allergy'>{translate('allergy', 'ალერგია')}</Option>
        </Select>
      </Form.Item>

      <Form.Item label={translate('symptoms', 'სიმპტომები')}>
        <Form.List name='symptoms'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row gutter={16} key={key} style={{ marginBottom: 16 }}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      label={translate('symptom', 'სიმპტომი')}
                      name={[name, 'symptom']}
                      rules={[{ required: true, message: `${translate('please_enter_symptom', 'გთხოვთ შეიყვანოთ სიმპტომი')}!` }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      label={translate('date_of_note', 'შენიშვნის თარიღი')}
                      name={[name, 'date']}
                      rules={[{ required: true, message: `${translate('please_enter_date_of_note', 'გთხოვთ შეიყვანოთ შენიშვნის თარიღი')}!` }]}
                    >
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...restField}
                      label={translate('intensity_of_pain', 'ტკივილის სიმძლავრე')}
                      name={[name, 'severity']}
                      rules={[{ required: true, message: `${translate('indicate_intensity_of_pain', 'გთხოვთ მიუთითოთ ტკივილის სიმძლავრე')}!` }]}
                    >
                      <Slider min={0} max={100} />
                    </Form.Item>
                  </Col>
                  <Col span={2} className='!flex !justify-center !items-center'>
                    <Tooltip title={translate('delete', 'წაშლა')}>
                      <Button
                        type='link'
                        className='!text-red-600'
                        onClick={() => remove(name)}
                        icon={<DeleteOutlined />}
                      />
                    </Tooltip>
                  </Col>
                </Row>
              ))}
              <Button
                type='dashed'
                onClick={() => add()}
                style={{ width: '100%' }}
              >
                {translate('add_symptom', 'სიმპტომის დამატება')}
              </Button>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          disabled={patientId ? !isFormDirty : false}
        >
          {translate('save', 'შენახვა')}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default PatientConditionForm
