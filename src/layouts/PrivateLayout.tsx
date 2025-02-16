import { Outlet, useNavigate } from 'react-router-dom'
import { ReactNode, useEffect } from 'react'
import { useAuth } from 'src/providers/AuthProvider'
import { Layout } from 'antd'
import AppHeader from 'src/modules/header/views/IndexPage.tsx'
import { Content, Footer } from 'antd/es/layout/layout'
import { useTranslation } from 'src/providers/TranslationProvider.tsx'

const PrivateLayout = (): ReactNode => {
  const auth = useAuth()
  const navigate = useNavigate()
  const { translate } = useTranslation()
  useEffect(() => {
    const checkAuthUser = () => {
      const user = auth.getAuthUser()
      if (user === null) navigate('/login')
    }
    checkAuthUser()
  }, [])
  return (
    <Layout className='!min-h-screen flex flex-col h-full'>
      <AppHeader />
      <Content className='flex-1 p-4 mb-20'>
        <Outlet />
      </Content>
      <Footer className='text-center bg-white border-t border-gray-200 py-4 fixed bottom-0 w-full'>
       © {new Date().getFullYear()} {translate('ministry_of_health', 'ჯანდაცვის სამინისტრო')}. {translate('all_rights_reserved', 'ყველა უფლება დაცულია')}
      </Footer>
    </Layout>
  )
}

export default PrivateLayout
