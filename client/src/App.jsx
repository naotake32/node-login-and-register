import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Welcome from './pages/Welcome'
import Credentials from './container/Credentials'
import PrivateRoute from './container/PrivateRoute'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/*" element={<PrivateRoute />} >
        <Route path="" element={<Welcome />} />
      </Route>

      <Route path="/login" element={<Credentials />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
