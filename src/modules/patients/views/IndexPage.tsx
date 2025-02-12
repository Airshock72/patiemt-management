import { Button, Form, Table, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { FilterFormValues } from 'src/modules/patients/types'
import usePatients from 'src/modules/patients/hooks/usePatients.ts'
import { columns, tablePagination } from 'src/modules/patients/helpers'
import Filters from 'src/modules/patients/views/Filters.tsx'
import { useAuth } from 'src/providers/AuthProvider.tsx'
import { UserRole } from 'api/auth/types.ts'
import { Patient } from 'api/patients/types.ts'

const PatientPage = () => {
  const auth = useAuth()
  const [form] = Form.useForm<FilterFormValues>()
  const { state, onFinish, handleDelete } = usePatients({ form })

  return (
    <div className='p-4'>
      <Filters form={form} onFinish={onFinish} />
      <Table
        columns={[
          ...columns,
          ...(auth.state.data.user?.roles?.includes(UserRole.ADMIN) ||
          auth.state.data.user?.roles?.includes(UserRole.ADMIN)
            ? [{
              title: 'წაშლა',
              key: 'action',
              render: (_: unknown, record: Patient) => (
                <Tooltip title='წაშლა' placement='top'>
                  <Button
                    type='link'
                    danger
                    onClick={() =>
                      handleDelete(record)
                    }
                    icon={<DeleteOutlined />}
                    className='delete-button'
                  />
                </Tooltip>
              )
            }]
            : [])
        ]}
        dataSource={state.data}
        rowKey='key'
        pagination={tablePagination}
        loading={state.isFetching}
      />
    </div>
  )
}

export default PatientPage
