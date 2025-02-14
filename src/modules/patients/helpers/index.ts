import type { ColumnsType } from 'antd/es/table'
import { FinancialRegistry, Patient, PatientStatus } from 'api/patients/types.ts'

export const patientColumns: ColumnsType<Patient> = [
  {
    title: '#',
    key: 'index',
    render: (_, __, index) => index + 1
  },
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

export const financialRegistryColumns: ColumnsType<FinancialRegistry> | undefined = [
  {
    title: 'სერვისი',
    dataIndex: 'service',
    key: 'service'
  },
  {
    title: 'თარიღი',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'თანხა',
    dataIndex: 'amount',
    key: 'amount'
  }
]
