import { Button, Form, Table } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { FilterFormValues } from 'src/modules/patients/types'
import usePatients from 'src/modules/patients/hooks/usePatients.ts'
import { columns, tablePagination } from 'src/modules/patients/helpers'
import Filters from 'src/modules/patients/views/Filters.tsx'
import { useAuth } from 'src/providers/AuthProvider.tsx'
import { UserRole } from 'api/auth/types.ts'
import { Patient } from 'api/patients/types.ts'
import TableButton from 'src/modules/patients/views/TableButton.tsx'
import { useNavigate } from 'react-router-dom'

const PatientPage = () => {
  const { getAuthUser } = useAuth()
  const user = getAuthUser()
  const isAdminOrDoctor = user && user.roles === undefined
    ? false :  user?.roles.includes(UserRole.ADMIN)
      || user?.roles?.includes(UserRole.DOCTOR)
  const isDoctor = user && user.roles === undefined ? false : user?.roles.includes(UserRole.DOCTOR)
  const [form] = Form.useForm<FilterFormValues>()
  const { state, onFinish, handleDelete } = usePatients({ form })
  const navigate = useNavigate()

  return (
    <div className='p-4'>
      <Filters form={form} onFinish={onFinish} />
      <Table
        columns={[
          ...columns,
          ...(isAdminOrDoctor
            ? [
              {
                title: 'რედაქტირება',
                key: 'edit',
                render: (_: unknown, record: Patient) => (
                  <TableButton
                    title='რედაქტირება'
                    handleClick={() => navigate(`/patients/${record.key}/edit`)}
                    icon={<EditOutlined />}
                  />
                )
              },
              {
                title: 'წაშლა',
                key: 'action',
                render: (_: unknown, record: Patient) => (
                  <TableButton
                    title='წაშლა'
                    danger
                    icon={<DeleteOutlined />}
                    handleClick={() => handleDelete(record)}
                    className='delete-button'
                  />
                )
              }
            ]
            : [])
        ]}
        dataSource={state.data}
        rowKey='key'
        pagination={tablePagination}
        loading={state.isFetching}
        title={() => (
          <div className='flex justify-between items-center'>
            <span className='font-bold py-5 align-middle'>
             პაციენტების სია
            </span>
            {isDoctor &&
                <Button
                  type='primary'
                  className='align-middle'
                  icon={<PlusOutlined />}
                  onClick={() => navigate('/patients/create')}
                >
                  პაციენტის დამატება
                </Button>}
          </div>
        )}
      />
    </div>
  )
}

export default PatientPage
