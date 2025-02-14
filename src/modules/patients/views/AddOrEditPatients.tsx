import {  Tabs, TabsProps  } from 'antd'
import PersonalInfo from 'src/modules/patients/views/PersonalInfo.tsx'
import PatientConditionForm from 'src/modules/patients/views/PatientConditionForm.tsx'
import usePatient from 'src/modules/patients/hooks/usePatient.ts'
import FinancialRegistry from 'src/modules/patients/views/FinancialRegistry.tsx'

const AddOrEditPatients = () => {
  const { handleTabChange, activeTab  } = usePatient()

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'პაციენტის პირადი ინფორმაცია',
      children: <PersonalInfo />
    },
    {
      key: '2',
      label: 'პაციენტის მდგომარეობა',
      children: <PatientConditionForm />
    },
    {
      key: '3',
      label: 'ფინანსური რეგისტრატურა',
      children: <FinancialRegistry />
    }
  ]

  return (
    <div className='p-4'>
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={items}
      />
    </div>
  )
}

export default AddOrEditPatients
