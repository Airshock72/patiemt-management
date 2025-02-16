import { Button, Col, DatePicker, Divider, Form, FormInstance, Input, Row, Select, Tooltip, Typography } from 'antd'
import { FilterFormValues } from 'src/modules/patients/types'
import { useTranslation } from 'src/providers/TranslationProvider.tsx'
import { ClearOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker
const { Option } = Select
const { Title } = Typography

interface FiltersProps {
  form: FormInstance<FilterFormValues>
  onFinish: (values: FilterFormValues) => void
  handleClearFilters: () => void
  isFilterActive: boolean
}

const Filters = ({ form, onFinish, isFilterActive, handleClearFilters }: FiltersProps) => {
  const { translate } = useTranslation()
  return (
    <>
      <Title level={4} className='mb-4'>
        {translate('filter', 'ფილტრი')}
      </Title>
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <Row gutter={16} align='middle'>
          <Col span={4}>
            <Form.Item name='firstName' label={translate('username', 'სახელი')}>
              <Input placeholder={translate('username', 'სახელი')} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='lastName' label={translate('lastname', 'გვარი')}>
              <Input placeholder={translate('lastname', 'გვარი')} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name='personalNumber'
              label={translate('private_number', 'პირადი ნომერი')}
            >
              <Input type='number' placeholder={translate('private_number', 'პირადი ნომერი')} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='dateRange' label={translate('date', 'თარიღი')}>
              <RangePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='status' label={translate('status', 'სტატუსი')}>
              <Select placeholder={translate('choose_status', 'აირჩიეთ სტატუსი')} allowClear>
                <Option value='1'>{translate('active', 'აქტიური')}</Option>
                <Option value='2'>{translate('passive', 'პასიური')}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col className='self-end'>
            <Form.Item>
              <Button type='primary' htmlType='submit'>{translate('search', 'ძებნა')}</Button>
            </Form.Item>
          </Col>
          {isFilterActive && (
            <Col span={2} className='self-center mt-2'>
              <Tooltip title={translate('clear_filter', 'გაასუფთავეთ ფილტრი')}>
                <Button
                  type='default'
                  icon={<ClearOutlined />}
                  onClick={handleClearFilters}
                  style={{ marginLeft: 8 }}
                />
              </Tooltip>
            </Col>
          )}
        </Row>
      </Form>
      <Divider className='my-14' />
    </>
  )
}

export default Filters
