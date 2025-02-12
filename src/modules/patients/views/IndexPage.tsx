import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Table, Tooltip,
  Typography
} from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { FilterFormValues } from 'src/modules/patients/types'
import usePatients from 'src/modules/patients/hooks/usePatients.ts'
import { columns, tablePagination } from 'src/modules/patients/helpers'

const { RangePicker } = DatePicker
const { Option } = Select
const { Title } = Typography

const PatientPage = () => {
  const [form] = Form.useForm<FilterFormValues>()
  const { state, onFinish, handleDelete } = usePatients({ form })

  return (
    <div className='p-4'>
      <Title level={4} className='mb-4'>
        ფილტრი
      </Title>
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <Row gutter={16} align='middle'>
          <Col span={4}>
            <Form.Item name='firstName' label='First Name'>
              <Input placeholder='სახელი' />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='lastName' label='Last Name'>
              <Input placeholder='გვარი' />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name='personalNumber'
              label='Personal Number'
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
            <Form.Item name='status' label='Status'>
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

      <Table
        columns={[...columns,
          {
            title: 'წაშლა',
            key: 'action',
            render: (_, record) => (
              <Tooltip title='წაშლა' placement='top'>
                <Button
                  type='link'
                  danger
                  onClick={() => handleDelete(record)}
                  icon={<DeleteOutlined />}
                  className='delete-button'
                />
              </Tooltip>
            )
          }]}
        dataSource={state.data}
        rowKey='key'
        pagination={tablePagination}
        loading={state.isFetching}
      />
    </div>
  )
}

export default PatientPage
