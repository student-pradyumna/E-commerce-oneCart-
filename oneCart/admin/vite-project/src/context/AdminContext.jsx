import React, {  createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { authDataContext } from './AuthContext'
 
export const adminDataContext=createContext()
function AdminContext({children}) {
  let [adminData,setAdminData]=useState(null)
  let {serverUrl}=useContext(authDataContext)
const getAdmin=async ()=>{
   
  try{
     let result =await axios.get(serverUrl + "/api/user/getadmin",{withCredentials:true})
  setAdminData(result.data);
  console.log(result.data)

  }catch(err){
    setAdminData(null)
    console.log(err)
  }
}
useEffect(()=>{
   getAdmin()
},[])
  let value={
      adminData,setAdminData,getAdmin
  }
  return (
    <div>
      <adminDataContext.Provider value={value}>
        {children}
      </adminDataContext.Provider>
    </div>
  )
}

export default AdminContext