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
             auth.state.data.user?.roles?.includes(UserRole.DOCTOR)
            ? [
              {
                title: 'რედაქტირება',
                key: 'edit',
                render: (_: unknown, record: Patient) => (
                  <TableButton
                    title='რედაქტირება'
                    handleClick={() => console.log(record)}
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
            {auth.state.data.user?.roles?.includes(UserRole.DOCTOR) &&
                <Button
                  type='primary'
                  className='align-middle'
                  icon={<PlusOutlined />}
                  onClick={() => {
                    // Add your logic to handle adding a new patient here
                    console.log('Add new patient')
                  }}
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
