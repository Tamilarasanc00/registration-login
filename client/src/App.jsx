import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Login'
import User from './User'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import File from './file'


function App() {
  
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/user' element={<User/>}></Route>
      <Route path='/create' element={<CreateUser/>}></Route>
      <Route path='/update/:id' element={<UpdateUser/>}></Route>
      <Route path='/file' element={<File/>}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
