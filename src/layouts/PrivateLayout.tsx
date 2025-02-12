import { Outlet, useNavigate } from 'react-router-dom'
import { ReactNode, useEffect } from 'react'
import { useAuth } from 'src/providers/AuthProvider'
import { Layout } from 'antd'
import AppHeader from 'src/modules/header/views/IndexPage.tsx'
import { Content, Footer } from 'antd/es/layout/layout'

const PrivateLayout = (): ReactNode => {
  const auth = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    const checkAuthUser =  () => {
      auth.getAuthUser()
      if (auth.state.data.user === null)  navigate('/login')
    }
    checkAuthUser()
  }, [])
  return (
    <Layout className='min-h-screen flex flex-col h-full'>
      <AppHeader />
      <Content className='flex-1 p-4 overflow-auto'>
        <Outlet />
      </Content>
      <Footer className='text-center bg-white border-t border-gray-200 py-4 fixed bottom-0 w-full'>
          © {new Date().getFullYear()} ჯანდაცვის სამინისტრო. ყველა უფლება დაცულია
      </Footer>
    </Layout>
  )
}

export default PrivateLayout
