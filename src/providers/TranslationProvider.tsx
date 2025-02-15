import { LanguageType } from 'core/types'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import eng from 'core/helpers/eng.json'
import geo from 'core/helpers/geo.json'

export interface TranslationContextType {
    readonly selectedLanguage: LanguageType
    readonly changeLanguage: (lang: LanguageType) => void
    readonly translate:  (key: string, defaultValue: string) => string
}


export function useTranslation(): TranslationContextType {
  return useContext<TranslationContextType>(TranslationContext)
}

const initialTranslation: TranslationContextType = {
  selectedLanguage: LanguageType.GEO,
  changeLanguage: () => ({}),
  translate: () => ''
}

export const TranslationContext = createContext<TranslationContextType>(initialTranslation)

const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>(LanguageType.GEO)

  const getLocalstorage = async () => {
    const lang = localStorage.getItem('language')
    setSelectedLanguage( Number(lang) || LanguageType.GEO)
  }

  const changeLanguage = (lang: LanguageType ) => {
    setSelectedLanguage(lang)
    localStorage.setItem('language', String(lang))
  }
  const translate = (key: string, defaultValue: string): string => {
    if (selectedLanguage === LanguageType.GEO) return (geo as Record<string, string>)[key] || defaultValue
    if (selectedLanguage === LanguageType.ENG) return (eng as Record<string, string>)[key] || defaultValue
    return defaultValue
  }

  useEffect(() => {
    getLocalstorage().then()
  }, [])


  const value: TranslationContextType = {
    changeLanguage,
    selectedLanguage,
    translate
  }

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>

}
export default TranslationProvider
