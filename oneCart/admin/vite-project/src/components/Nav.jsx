import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
function Nav() {
  let navigate=useNavigate()
  let {serverUrl}=useContext(authDataContext)
  let {getAdmin}=useContext(adminDataContext)
  const logout=async ()=>{
    try{
       const result=await axios.get(serverUrl + "/api/auth/logout",{withCredentials:true})
       console.log(result.data)
       getAdmin()
       navigate("/login")
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='w-[100vw] h-[70px] bg-[#dedbdbf8] z-10 fixed top-0 items-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-black flex'>
      <div className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer' onClick={()=>navigate('/')}>
         <img src={logo} alt="" className='w-[30px] ' />
         <h1 className='text-[25px] text-[black] font-sans'>OneCart</h1>
      </div>
        <button className='text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white' onClick={logout}>LogOut</button>
    </div>
     
  )
}

export default Nav