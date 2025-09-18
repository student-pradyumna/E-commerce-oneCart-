import React, { children, createContext } from 'react'
export const authDataContext=createContext()
function AuthContext({children}) {
  let serverUrl="https://e-commerce-onecart-mybackend-x244.onrender.com"
  let value={
    serverUrl
  }
  return (
    <div>
     <authDataContext.Provider value={value}>
      {children}
     </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
