import { PatientsApi } from 'src/api'
import { FinancialRegistryStore, useFinancialRegistryReducer } from 'src/modules/patients/store/financialRegistry.ts'
import { ID } from 'api/types/apiGlobalTypes.ts'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface UseFinancialRegistryProps {
  patientId?: ID
  isDoctor?: boolean
}

interface UseFinancialRegistry {
  state: FinancialRegistryStore
}

const useFinancialRegistry = ({ patientId, isDoctor }: UseFinancialRegistryProps): UseFinancialRegistry => {
  const [state, dispatch] = useFinancialRegistryReducer()
  const navigate = useNavigate()


  const getFinancialRegistry = (id: ID) => {
    dispatch({ type: 'SEND_FINANCIAL_REGISTRY_REQUEST' })
    const financialRegistry = PatientsApi.getFinancialRegistry(id)
    dispatch({ type: 'DONE_FINANCIAL_REGISTRY_REQUEST', payload: financialRegistry })
  }

  useEffect(() => {
    if (patientId) getFinancialRegistry(patientId)
    if (!isDoctor) navigate('/access-denied')
  }, [patientId])

  return { state }
}

export default useFinancialRegistry
