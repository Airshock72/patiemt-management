import {  Tabs, TabsProps  } from 'antd'
import usePatient from 'src/modules/patients/hooks/usePatient.ts'
import { useParams } from 'react-router-dom'
import { useAuth } from 'src/providers/AuthProvider.tsx'
import { UserRole } from 'api/auth/types.ts'
import PersonalInfo from 'src/modules/patients/views/PersonalInfo.tsx'
// import PatientConditionForm from 'src/modules/patients/views/PatientConditionForm.tsx'

const AddOrEditPatients = () => {
  const params = useParams()
  const patientId = params.id
  const { getAuthUser } = useAuth()
  const user = getAuthUser()
  const isDoctor = user && user.roles === undefined ? false : user?.roles.includes(UserRole.DOCTOR)
  const {
    state,
    createPatient,
    updatePatient
  } = usePatient({ id: patientId, isDoctor })

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'პაციენტის პირადი ინფორმაცია',
      children:
          <PersonalInfo
            state={state}
            patientId={patientId}
            createPatient={createPatient}
            updatePatient={updatePatient}
          />
    }
    // {
    //   key: '2',
    //   label: 'პაციენტის მდგომარეობა',
    //   children: <PatientConditionForm />
    // }
  ]

  return (
    <div className='p-4'>
      <Tabs defaultActiveKey='1' items={items} />
    </div>
  )
}

export default AddOrEditPatients
