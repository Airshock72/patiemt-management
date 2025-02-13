import { useLocation, useNavigate } from 'react-router-dom'
import { MenuProps } from 'antd'

interface UseHeader {
    handleMenuClick: MenuProps['onClick']
    selectedKey: string
    currentRoute: string
}

interface UseHeaderProps {
    signOut: () => void
}

const useHeader = ({ signOut }: UseHeaderProps): UseHeader => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
    case 'patients':
      navigate('/')
      break
    case 'add-patient':
      navigate('/add-patient')
      break
    case 'profile':
      navigate('/profile')
      break
    case 'logout':
      signOut()
      break
    default:
      break
    }
  }

  const selectedKey = location.pathname === '/' ? 'patients' : ''
  const currentRoute = location.pathname

  return { handleMenuClick, selectedKey, currentRoute }
}

export default useHeader
