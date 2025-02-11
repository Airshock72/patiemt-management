import { Route, Routes } from 'react-router-dom'
import { RouteType } from 'api/core'
import NotFound from 'src/modules/notFound/views/IndexPage.tsx'

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

const App = () => {
	return (
		<Routes>
			{/*<Route element={<PrivateLayout />}>*/}
			{/*	{routes.map((el, index) => <Route key={index} path={el.path} Component={el.element} />)}*/}
			{/*</Route>*/}
			{/*<Route path={RoutePathTypes.LOGIN} element={<LoginPage />} />*/}
			{/*<Route path={RoutePathTypes.SIGNUP} element={<SignUp />} />*/}
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default App
