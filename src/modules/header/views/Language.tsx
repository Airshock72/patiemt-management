import { LanguageType } from 'core/types'
import { useTranslation } from 'src/providers/TranslationProvider'
import Eng from '../../../assets/media/images/eng.png'
import Geo from '../../../assets/media/images/geo.png'

const Language = () => {
  const { changeLanguage, selectedLanguage } = useTranslation()
  return(
    <div className='cursor-pointer'>
      <span
        onClick={() => changeLanguage(selectedLanguage === LanguageType.GEO ? LanguageType.ENG : LanguageType.GEO)}
      > <img className='flag-icon ml-2' alt='geo'  src={selectedLanguage === LanguageType.GEO ? Geo : Eng } />
      </span>
    </div>

  )
}

export default Language
