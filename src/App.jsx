import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Jobs from './pages/Jobs'
import SelectedJob from './pages/SelectedJob'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/jobs' element={<Jobs/>}/>
      <Route path='/jobs/:id' element={<SelectedJob/>}/>
    </Routes>
  )
}

export default App