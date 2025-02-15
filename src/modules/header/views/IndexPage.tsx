import {
  Avatar,
  Layout,
  Menu,
  Typography
} from 'antd'
import {
  LogoutOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/providers/AuthProvider.tsx'
import { UserRole } from 'api/auth/types.ts'
import useHeader from 'src/modules/header/hooks/useHeader.ts'
import ThemeToggle from 'src/modules/header/views/ThemeToggle.tsx'
import Language from 'src/modules/header/views/Language.tsx'
import { useTranslation } from 'src/providers/TranslationProvider.tsx'

const { Header } = Layout
const { Title, Text } = Typography

const AppHeader = () => {
  const { signOut, getAuthUser } = useAuth()
  const navigate = useNavigate()
  const { translate } = useTranslation()
  const user = getAuthUser()
  const isDoctor = user?.roles === undefined ? false : user.roles.includes(UserRole.DOCTOR)
  const { handleMenuClick, selectedKey, currentRoute } = useHeader({ signOut })

  const menuItems = [
    {
      key: 'patients',
      label: translate('patients', 'პაციენტები'),
      icon: <TeamOutlined />,
      className: currentRoute === '/' ? 'selected-menu-item' : ''
    },
    {
      key: 'logout',
      label: translate('logout', 'გამოსვლა'),
      icon: <LogoutOutlined />
    }
  ]

  return (
    <Header className='flex justify-between items-center shadow-sm'>
      <div className='cursor-pointer' onClick={() => navigate('/')}>
        <Title level={4} className='mb-0 !text-amber-100'>
          {translate('patients_management', 'პაციენტების მენეჯმენტი')}
        </Title>
      </div>
      <div className='flex items-center gap-4'>
        {user && (
          <>
            <div className='flex items-center gap-2 mr-10'>
              <Avatar
                icon={<UserOutlined />}
                src={user.avatar}
                className='bg-blue-500'
              />
              <div className='flex flex-col'>
                <Text strong className='!text-white'>
                  {user.username}
                </Text>
                {isDoctor && (
                  <Text
                    type='secondary'
                    className='text-xs !text-amber-100'
                  >
                    {user.clinicName}
                  </Text>
                )}
              </div>
            </div>
            <ThemeToggle />
            <Language />
          </>
        )}
        <div className='hidden md:block'>
          <Menu
            mode='horizontal'
            className='border-0'
            items={menuItems}
            onClick={handleMenuClick}
            selectedKeys={[selectedKey]}
            theme='dark'
          />
        </div>
      </div>
    </Header>
  )
}

export default AppHeader
