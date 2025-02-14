import { Table, Button } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import useFinancialRegistry from 'src/modules/patients/hooks/useFinancialRegistry.ts'
import { useAuth } from 'src/providers/AuthProvider.tsx'
import { UserRole } from 'api/auth/types.ts'
import { financialRegistryColumns } from 'src/modules/patients/helpers'

const FinancialRegistry = () => {
  const params = useParams()
  const patientId = params.id
  const { getAuthUser } = useAuth()
  const user = getAuthUser()
  const isDoctor = user && user.roles === undefined ? false : user?.roles.includes(UserRole.DOCTOR)
  const { state } = useFinancialRegistry({ patientId, isDoctor })
  const navigate = useNavigate()

  const handleFinish = () => {
    navigate('/')
  }

  return (
    <div>
      <Table
        dataSource={state.data}
        columns={financialRegistryColumns}
        pagination={false}
      />
      <Button
        type='primary'
        onClick={handleFinish}
        style={{ marginTop: 16 }}
      >
        დასრულება
      </Button>
    </div>
  )
}

export default FinancialRegistry
