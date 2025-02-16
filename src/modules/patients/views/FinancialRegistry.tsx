import { Table, Button } from 'antd'
import { useParams } from 'react-router-dom'
import useFinancialRegistry from 'src/modules/patients/hooks/useFinancialRegistry.ts'
import { useAuth } from 'src/providers/AuthProvider.tsx'
import { UserRole } from 'api/auth/types.ts'
import { financialRegistryColumns } from 'src/modules/patients/helpers'
import { useTranslation } from 'src/providers/TranslationProvider.tsx'

const FinancialRegistry = () => {
  const params = useParams()
  const patientId = params.id
  const { getAuthUser } = useAuth()
  const user = getAuthUser()
  const isDoctor = user && user.roles === undefined ? false : user?.roles.includes(UserRole.DOCTOR)
  const isAdminOrDoctor = user && user.roles === undefined
    ? false
    : user?.roles.includes(UserRole.ADMIN) || user?.roles?.includes(UserRole.DOCTOR)
  const { state, handleFinish } = useFinancialRegistry({ patientId, isDoctor, isAdminOrDoctor })
  const { translate } = useTranslation()


  return (
    <div>
      <Table
        dataSource={state.data}
        columns={financialRegistryColumns(translate)}
        pagination={false}
        bordered
      />
      <Button
        type='primary'
        onClick={handleFinish}
        style={{ marginTop: 16 }}
      >
        {translate('finish', 'დასრულება')}
      </Button>
    </div>
  )
}

export default FinancialRegistry
