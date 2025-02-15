import type { ColumnsType } from 'antd/es/table'
import { FinancialRegistry, Patient, PatientStatus } from 'api/patients/types.ts'

export const patientColumns = (translate: (key: string, defaultValue: string) => string): ColumnsType<Patient> => [
  {
    title: '#',
    key: 'index',
    render: (_, __, index) => index + 1
  },
  {
    title: translate('firstname', 'სახელი'),
    dataIndex: 'firstName',
    key: 'firstName'
  },
  {
    title: translate('lastname', 'გვარი'),
    dataIndex: 'lastName',
    key: 'lastName'
  },
  {
    title: translate('private_number', 'პირადი ნომერი'),
    dataIndex: 'personalNumber',
    key: 'personalNumber'
  },
  {
    title: translate('create_date', 'დამატების თარიღი'),
    dataIndex: 'addedDate',
    key: 'addedDate'
  },
  {
    title: translate('status', 'სტატუსი'),
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

export const financialRegistryColumns = (translate: (key: string, defaultValue: string) => string): ColumnsType<FinancialRegistry> | undefined => [
  {
    title: translate('service', 'სერვისი'),
    dataIndex: 'service',
    key: 'service'
  },
  {
    title: translate('date', 'თარიღი'),
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: translate('price', 'თანხა'),
    dataIndex: 'amount',
    key: 'amount'
  }
]
