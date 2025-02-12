import {
  Button,
  Form,
  Table,
  Tooltip
} from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { FilterFormValues } from 'src/modules/patients/types'
import usePatients from 'src/modules/patients/hooks/usePatients.ts'
import { columns, tablePagination } from 'src/modules/patients/helpers'
import Filters from 'src/modules/patients/views/Filters.tsx'

const PatientPage = () => {
  const [form] = Form.useForm<FilterFormValues>()
  const { state, onFinish, handleDelete } = usePatients({ form })

  return (
    <div className='p-4'>
      <Filters form={form} onFinish={onFinish} />
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
