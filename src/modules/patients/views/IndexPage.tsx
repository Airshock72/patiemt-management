import { Button, Form, Table } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { FilterFormValues } from 'src/modules/patients/types'
import usePatients from 'src/modules/patients/hooks/usePatients.ts'
import { patientColumns, tablePagination } from 'src/modules/patients/helpers'
import Filters from 'src/modules/patients/views/Filters.tsx'
import { useAuth } from 'src/providers/AuthProvider.tsx'
import { UserRole } from 'api/auth/types.ts'
import { Patient } from 'api/patients/types.ts'
import TableButton from 'src/modules/patients/views/TableButton.tsx'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'src/providers/TranslationProvider.tsx'

const PatientPage = () => {
  const { getAuthUser } = useAuth()
  const { translate } = useTranslation()
  const user = getAuthUser()
  const isAdminOrDoctor = user && user.roles === undefined
    ? false
    : user?.roles.includes(UserRole.ADMIN) || user?.roles?.includes(UserRole.DOCTOR)
  const isDoctor = user && user.roles === undefined ? false : user?.roles.includes(UserRole.DOCTOR)
  const [form] = Form.useForm<FilterFormValues>()
  const { state, onFinish, handleDelete } = usePatients({ form })
  const navigate = useNavigate()

  return (
    <div className='p-4'>
      <Filters form={form} onFinish={onFinish} />
      <Table
        columns={[
          ...patientColumns(translate),
          ...(isAdminOrDoctor
            ? [
              {
                title: translate('edit', 'რედაქტირება'),
                key: 'edit',
                render: (_: unknown, record: Patient) => (
                  <TableButton
                    title={translate('edit', 'რედაქტირება')}
                    handleClick={() => navigate(`/patients/${record.key}/edit`)}
                    icon={<EditOutlined />}
                  />
                )
              },
              {
                title: translate('delete', 'წაშლა'),
                key: 'action',
                render: (_: unknown, record: Patient) => (
                  <TableButton
                    title={translate('delete', 'წაშლა')}
                    danger
                    icon={<DeleteOutlined />}
                    handleClick={() => handleDelete(record, translate)}
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
              {translate('patients_list', 'პაციენტების სია')}
            </span>
            {isDoctor &&
                <Button
                  type='primary'
                  className='align-middle'
                  icon={<PlusOutlined />}
                  onClick={() => navigate('/patients/create')}
                >
                  {translate('add_patient', 'პაციენტის დამატება')}
                </Button>}
          </div>
        )}
      />
    </div>
  )
}

export default PatientPage
