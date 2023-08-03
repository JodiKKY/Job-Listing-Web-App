import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Jobs from '../pages/Jobs'
import SelectedJob from '../pages/SelectedJob'
import ProtectedRoutes from './ProtectedRoutes'
import SignIn from '../pages/auth/SignIn'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/sign-in' element={<SignIn />} />

      <Route path='app' element={<ProtectedRoutes />}>
        <Route path='jobs' element={<Jobs />} />
        <Route path='jobs/:id' element={<SelectedJob />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes