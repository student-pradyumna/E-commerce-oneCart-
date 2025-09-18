 import React, { useContext } from 'react'
   import { ToastContainer, toast } from 'react-toastify';

import { Routes,Route } from 'react-router-dom'
 import List from './pages/List'
 import Add from './pages/Add'
 import Orders from './pages/Orders'
 import Login from './pages/Login'
 import Home from './pages/Home'
import { adminDataContext } from './context/AdminContext'
 function App() {
  let {adminData}=useContext(adminDataContext)
   return (
    <>  
            <ToastContainer />

   {!adminData ? <Login/> :<>  
  <Routes>
  <Route path="/" element={<Home />}/>
  <Route path="/add" element={<Add />}/>
  <Route path="/list" element={<List />}/>
  <Route path="/orders" element={<Orders />}/>
  <Route path="/login" element={<Login />}/>

  </Routes>
  </>}
  
    </>
   )
 }
 
 export default App