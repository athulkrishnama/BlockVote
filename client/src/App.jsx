import './App.css'
import Login from './Components/Login'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import SignUp from './Components/SignUp'

function App() {
  return (
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
  )
}

export default App
