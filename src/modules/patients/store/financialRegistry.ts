import { Dispatch, useReducer } from 'react'
import { FinancialRegistry } from 'api/patients/types.ts'

export interface FinancialRegistryStore {
    readonly data: Array<FinancialRegistry>
    readonly isFetching: boolean
}

export type SEND_FINANCIAL_REGISTRY_REQUEST = 'SEND_FINANCIAL_REGISTRY_REQUEST'
export type DONE_FINANCIAL_REGISTRY_REQUEST = 'DONE_FINANCIAL_REGISTRY_REQUEST'

export type FinancialRegistryActions =
    | { type: SEND_FINANCIAL_REGISTRY_REQUEST }
    | { type: DONE_FINANCIAL_REGISTRY_REQUEST, readonly payload: Array<FinancialRegistry> }

export const initialFinancialRegistry: Array<FinancialRegistry> = []

const initialFinancialRegistryStore: FinancialRegistryStore = {
  data: initialFinancialRegistry,
  isFetching: false
}

export const useFinancialRegistryReducer = () : [FinancialRegistryStore, Dispatch<FinancialRegistryActions>] => {
  return useReducer(financialRegistryReducer, initialFinancialRegistryStore)
}

export const financialRegistryReducer = (state: FinancialRegistryStore, action: FinancialRegistryActions): FinancialRegistryStore => {
  switch (action.type) {
  case 'SEND_FINANCIAL_REGISTRY_REQUEST':
    return {
      ...state,
      isFetching: true
    }
  case 'DONE_FINANCIAL_REGISTRY_REQUEST':
    return {
      ...state,
      data: action.payload || state.data,
      isFetching: false
    }
  default:
    return state
  }
}
