import { Button, Col, DatePicker, Divider, Form, FormInstance, Input, Row, Select, Typography } from 'antd'
import { FilterFormValues } from 'src/modules/patients/types'

const { RangePicker } = DatePicker
const { Option } = Select
const { Title } = Typography

interface FiltersProps {
    form: FormInstance<FilterFormValues>
    onFinish: (values: FilterFormValues) => void
}

const Filters = ({ form, onFinish }: FiltersProps) => {
  return (
    <>
      <Title level={4} className='mb-4'>
                ფილტრი
      </Title>
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <Row gutter={16} align='middle'>
          <Col span={4}>
            <Form.Item name='firstName' label='სახელი'>
              <Input placeholder='სახელი' />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='lastName' label='გვარი'>
              <Input placeholder='გვარი' />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name='personalNumber'
              label='პირადი ნომერი'
            >
              <Input type='number' placeholder='პირადი ნომერი' />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name='dateRange' label='თარიღი'>
              <RangePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='status' label='სტატუსი'>
              <Select placeholder='აირჩიეთ სტატუსი' allowClear>
                <Option value='1'>აქტიური</Option>
                <Option value='2'>პასიური</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={2} className='self-end'>
            <Form.Item>
              <Button type='primary' htmlType='submit'>ძებნა</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Divider className='my-14' />
    </>
  )
}

export default Filters
