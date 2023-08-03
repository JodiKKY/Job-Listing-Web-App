import { Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Jobs from '../pages/Jobs'
import SelectedJob from '../pages/SelectedJob'
import ProtectedRoutes from './ProtectedRoutes'
import SignIn from '../pages/auth/SignIn'
import SignUp from '../pages/auth/SignUp'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />

      <Route path='app' element={<ProtectedRoutes />}>
        <Route path='jobs' element={<Jobs />} />
        <Route path='jobs/:id' element={<SelectedJob />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes