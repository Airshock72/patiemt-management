import IndexPage from './views/IndexPage'
import AddOrEditPatients from 'src/modules/patients/views/AddOrEditPatients.tsx'

export default [
  {
    path: '/',
    element: IndexPage
  },
  {
    path: '/patients/:id/edit',
    element: AddOrEditPatients
  },
  {
    path: '/patients/create',
    element: AddOrEditPatients
  }
]
