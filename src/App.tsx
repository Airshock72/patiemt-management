import { Route, Routes } from 'react-router-dom'
import { RouteType } from 'api/core'
import LoginPage from 'src/modules/auth/login/views/IndexPage.tsx'
import NotFound from 'src/modules/notFound/views/IndexPage.tsx'
import { AuthProvider } from 'src/providers/AuthProvider.tsx'
import PrivateLayout from 'src/layouts/PrivateLayout.tsx'
import AccessDenied from 'src/modules/accessDenied/views/IndexPage.tsx'
import { App, ConfigProvider, theme } from 'antd'
import { useTheme } from 'src/providers/ThemeContext.tsx'

const routesFromContext = (): Array<RouteType> => {
  const moduleRoutes: Array<RouteType> = []
  const routeModules = import.meta.glob('./**/routes.ts', { eager: true }) as Record<string, { default: Array<RouteType> }>
  Object.values(routeModules).forEach((module) => {
    if (Array.isArray(module.default)) {
      moduleRoutes.push(...module.default)
    }
  })
  return moduleRoutes
}

export const routes = routesFromContext()

const Application = () => {
  const { isDarkMode } = useTheme()

  return (
    <ConfigProvider theme={{ algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <AuthProvider>
        <Routes>
          <Route element={<App><PrivateLayout /></App>}>
            {routes.map((el, index) => <Route key={index} path={el.path} Component={el.element} />)}
          </Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/access-denied' element={<AccessDenied />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </ConfigProvider>
  )
}

export default Application
