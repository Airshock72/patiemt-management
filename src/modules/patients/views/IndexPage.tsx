import { Form, Input, DatePicker, Select, Button, Table, Row, Col, Divider, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { FilterFormValues } from 'src/modules/patients/types'
import usePatients from 'src/modules/patients/hooks/usePatients.ts'
import { Patient } from 'api/patients/types.ts'

const { RangePicker } = DatePicker
const { Option } = Select
const { Title } = Typography

const PatientPage = () => {
  const [form] = Form.useForm<FilterFormValues>()
  const { state, onFinish } = usePatients({ form })

  // Table columns
  const columns: ColumnsType<Patient> = [
    {
      title: 'სახელი',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'გვარი',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'პირადი ნომერი',
      dataIndex: 'personalNumber',
      key: 'personalNumber'
    },
    {
      title: 'დამატების თარიღი',
      dataIndex: 'addedDate',
      key: 'addedDate'
    },
    {
      title: 'სტატუსი',
      dataIndex: 'status',
      key: 'status'
    }
  ]

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
            <Form.Item name='personalNumber' label='Personal Number'>
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
              <Select placeholder='აირჩიეთ სტატუსი'>
                <Option value='Active'>Active</Option>
                <Option value='Inactive'>Inactive</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={2} className='self-end'>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                  ძებნა
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Divider className='my-14' />

      <Table
        columns={columns}
        dataSource={state.data}
        rowKey='key'
        pagination={{
          pageSizeOptions: ['2', '5', '10', '20', '50'],
          showSizeChanger: true,
          defaultPageSize: 5
        }}
        loading={state.isFetching}
      />
    </div>
  )
}

export default PatientPage
