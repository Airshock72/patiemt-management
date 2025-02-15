import {  Tabs, TabsProps  } from 'antd'
import PersonalInfo from 'src/modules/patients/views/PersonalInfo.tsx'
import PatientConditionForm from 'src/modules/patients/views/PatientConditionForm.tsx'
import usePatient from 'src/modules/patients/hooks/usePatient.ts'
import FinancialRegistry from 'src/modules/patients/views/FinancialRegistry.tsx'
import { useTranslation } from 'src/providers/TranslationProvider.tsx'

const AddOrEditPatients = () => {
  const { handleTabChange, activeTab  } = usePatient()
  const { translate } = useTranslation()

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: translate('patient_personal_information', 'პაციენტის პირადი ინფორმაცია'),
      children: <PersonalInfo />
    },
    {
      key: '2',
      label: translate('patient_condition', 'პაციენტის მდგომარეობა'),
      children: <PatientConditionForm />
    },
    {
      key: '3',
      label: translate('financial_registry', 'ფინანსური რეგისტრატურა'),
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
