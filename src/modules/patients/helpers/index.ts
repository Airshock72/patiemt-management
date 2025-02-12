import type { ColumnsType } from 'antd/es/table'
import { Patient, PatientStatus } from 'api/patients/types.ts'

export const columns: ColumnsType<Patient> = [
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
    key: 'status',
    render: (status: PatientStatus) => status === PatientStatus.ACTIVE ? 'აქტიური' : 'პასიური'
  }
]

export const tablePagination = {
  pageSizeOptions: ['2', '5', '10', '20', '50'],
  showSizeChanger: true,
  defaultPageSize: 5
}
