import { useState } from 'react'
import Login from './components/Login/Login'
import image from './components/images/pics.jpg'
import {Route, Routes} from 'react-router-dom';
import './App.css'
import Register from './components/Login/Register';



function App() {

  return (
    <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{"backgroundImage": `url(${image})` }}>
      <Routes>
        <Route path='Login' element={<Login/>} />
        <Route path='' element={<Register/>} />
      </Routes>
    </div>
  )
}

export default App
