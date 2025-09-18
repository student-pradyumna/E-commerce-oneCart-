 import React, { useContext } from 'react'
 import { Route,Routes, useLocation } from 'react-router-dom'
 import Registration from './pages/Registration'
 import Login from './pages/Login'
 import Home from './pages/Home'
 import Nav from './component/Nav'
import { userDataContext } from './context/UserContext'
import Collection from './pages/Collection'
import Product from "./pages/Product"
import Contact from "./pages/Contact"
import About from "./pages/About"
import {Navigate} from "react-router-dom"
import ProductDetail from './pages/ProductDetail'
import Cart from "./pages/cart"
import PlaceOrder from './pages/placeorder'
import Order from "./pages/Order"
import NotFound from './pages/NotFound'
import Ai from './component/Ai'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 function App() {
  let {userData}=useContext(userDataContext)
  let location =useLocation()
   return (
     <>
     <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        pauseOnHover 
        draggable 
        theme="colored"
      />
     {userData && <Nav/>}
     <Routes>
      <Route path="/login"
       element={userData ? (<Navigate to={location.state?.from || "/"}/>) :(<Login/>)}/>

      <Route path="/signup"
       element={userData ? (<Navigate to={location.state?.from || "/"}/>) :(<Registration/>)}/>

      <Route path="/" element={userData ? <Home/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>
       
      <Route path="/about" element={userData ? <About/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>

      <Route path="/collection" element={userData ? <Collection/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>

      <Route path="/product" element={userData ? <Product/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>

      <Route path="/contact" element={userData ? <Contact/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>

      <Route path="/productdetail/:productId" element={userData ? <ProductDetail/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>

      <Route path="/cart" element={userData ? <Cart/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>


       <Route path="/placeorder" element={userData ? <PlaceOrder/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>

       <Route path="/order" element={userData ? <Order/> : <Navigate to="/login" state={{from:location.pathname}}/>}/>

       <Route path="*" element={<NotFound/>}/>

     </Routes>
     <Ai/>
     
     </>
   )
 }
 
 export default App

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   