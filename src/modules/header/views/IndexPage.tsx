import {
  Avatar,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Space,
  Typography
} from 'antd'
import {
  LogoutOutlined,
  MenuOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from 'src/providers/AuthProvider.tsx'
import { UserRole } from 'api/auth/types.ts'

const { Header } = Layout
const { Title, Text } = Typography

const AppHeader = () => {
  const navigate = useNavigate()
  const { signOut, getAuthUser } = useAuth()
  const user = getAuthUser()
  const isDoctor = user?.roles === undefined ? false : user.roles.includes(UserRole.DOCTOR)
  const location = useLocation()

  const menuItems = [
    {
      key: 'patients',
      label: 'პაციენტები',
      icon: <TeamOutlined />
    },
    {
      key: 'logout',
      label: 'გამოსვლა',
      icon: <LogoutOutlined />
    }
  ]

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

  const selectedKey =
        location.pathname === '/'
          ? 'patients'
          : location.pathname.split('/')[1] || ''

  return (
    <Header className='flex justify-between items-center bg-white shadow-sm'>
      <Title level={4} className='mb-0 !text-amber-100'>
                პაციენტების მენეჯმენტი
      </Title>
      <div className='flex items-center gap-4'>
        {user && (
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
        )}
        <div className='hidden md:block'>
          <Menu
            mode='horizontal'
            className='border-0'
            items={menuItems}
            onClick={handleMenuClick}
            selectedKeys={[selectedKey]}
          />
        </div>

        {/* Mobile Menu */}
        <div className='block md:hidden'>
          <Dropdown
            menu={{
              items: menuItems,
              onClick: handleMenuClick,
              selectedKeys: [selectedKey]
            }}
            trigger={['click']}
          >
            <Space>
              <MenuOutlined className='text-xl' />
            </Space>
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}

export default AppHeader
