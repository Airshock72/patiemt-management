import { useEffect, useState } from 'react'
import { PatientTabs } from 'api/patients/types.ts'

interface UsePatient {
    activeTab: PatientTabs
    handleTabChange: (activeKey: string) => void
}

const usePatient = (): UsePatient => {
  const [activeTab, setActiveTab] = useState(PatientTabs.PERSONAL_INFO) // Default to the first tab

  const handleTabChange = (activeKey: string) => {
    switch (activeKey) {
    case PatientTabs.PERSONAL_INFO:
    case PatientTabs.CONDITION:
    case PatientTabs.FINANCIAL_REGISTRY:
      setActiveTab(activeKey)
      localStorage.setItem('activeTab', activeKey)
      break
    default:
      setActiveTab(PatientTabs.PERSONAL_INFO) // Fallback to a default tab
      localStorage.setItem('activeTab', PatientTabs.PERSONAL_INFO)
      break
    }
  }

  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab')
    if (savedTab) setActiveTab(savedTab as PatientTabs)
  }, [])

  return { activeTab, handleTabChange }
}

export default usePatient
