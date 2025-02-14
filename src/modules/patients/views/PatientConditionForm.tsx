import { Form, Select, Input, Button, Slider, DatePicker, Row, Col, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import usePatientCondition from 'src/modules/patients/hooks/usePatientCondition.ts'
import { useParams } from 'react-router-dom'
import { useAuth } from 'src/providers/AuthProvider.tsx'
import { UserRole } from 'api/auth/types'
import { PatientConditionFormValues } from 'api/patients/types.ts'
import { useEffect } from 'react' // Import the Delete icon

const { Option } = Select

const PatientConditionForm = () => {
  const [form] = Form.useForm()
  const params = useParams()
  const patientId = params.id
  const { getAuthUser } = useAuth()
  const user = getAuthUser()
  const isDoctor = user && user.roles === undefined ? false : user?.roles.includes(UserRole.DOCTOR)
  const { state, updatePatientCondition } = usePatientCondition({ id: patientId, isDoctor })

  const onFinish = (values: PatientConditionFormValues) => {
    if (patientId) {
      const updatedValues = updatePatientCondition(values, patientId)
      form.setFieldsValue(updatedValues)
    }
  }

  useEffect(() => {
    if (state.data) {
      form.setFieldsValue(state.data)
    }
  }, [state.data, form])

  return (
    <Form
      onFinish={onFinish}
      layout='vertical'
      form={form}
      initialValues={state.data}
    >
      <Form.Item
        label='დაავადება'
        name='disease'
        rules={[{ required: true, message: 'გთხოვთ აირჩიოთ დაავადება!' }]}
      >
        <Select placeholder='აირჩიეთ დაავადება'>
          <Option value='flu'>გრიპი</Option>
          <Option value='cold'>ცივი</Option>
          <Option value='covid'>COVID-19</Option>
          <Option value='allergy'>ალერგია</Option>
        </Select>
      </Form.Item>

      <Form.Item label='სიმპტომები'>
        <Form.List name='symptoms'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row gutter={16} key={key} style={{ marginBottom: 16 }}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      label='სიმპტომი'
                      name={[name, 'symptom']}
                      rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ სიმპტომი!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      label='შენიშვნის თარიღი'
                      name={[name, 'date']}
                      rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ შენიშვნის თარიღი!' }]}
                    >
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...restField}
                      label='ტკივილის სიმძლავრე'
                      name={[name, 'severity']}
                      rules={[{ required: true, message: 'გთხოვთ მიუთითოთ ტკივილის სიმძლავრე!' }]}
                    >
                      <Slider min={0} max={100} />
                    </Form.Item>
                  </Col>
                  <Col span={2} className='!flex !justify-center !items-center'>
                    <Tooltip title='წაშლა'>
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
                    სიმპტომის დამატება
              </Button>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
            შენახვა
        </Button>
      </Form.Item>
    </Form>
  )
}

export default PatientConditionForm
