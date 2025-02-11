import { Layout, Menu, Typography, Dropdown, Space, MenuProps } from 'antd'
import {
  UserOutlined,
  TeamOutlined,
  PlusCircleOutlined,
  LogoutOutlined,
  MenuOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from 'src/providers/AuthProvider.tsx'

const { Header } = Layout
const { Title } = Typography

const AppHeader = () => {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const location = useLocation()
  const role = 'doctor'

  const menuItems = [
    {
      key: 'patients',
      label: 'პაციენტები',
      icon: <TeamOutlined />
    },
    ...(role === 'doctor'
      ? [
        {
          key: 'add-patient',
          label: 'პაციენტის დამატება',
          icon: <PlusCircleOutlined />
        }
      ]
      : []),
    {
      key: 'profile',
      label: 'პროფილი',
      icon: <UserOutlined />
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

  const selectedKey = location.pathname === '/' ? 'patients' : location.pathname.split('/')[1] || ''

  return (
    <Header className='flex justify-between items-center bg-white shadow-sm'>
      {/* Logo or App Name */}
      <Title level={4} className='mb-0 !text-amber-100'>
        პაციენტების მენეჯმენტი
      </Title>

      {/* Desktop Menu */}
      <div className='hidden md:block'>
        <Menu
          mode='horizontal'
          className='border-0'
          items={menuItems}
          onClick={handleMenuClick}
          selectedKeys={[selectedKey]}
        />
      </div>

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
    </Header>
  )
}

export default AppHeader
