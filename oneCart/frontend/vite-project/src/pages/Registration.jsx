 import React, { useContext, useState } from 'react'
import Logo from "../assets/logo.png"
import google from "../assets/google.png"
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/authContext';
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import axios from 'axios'
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

function Registration() {
  const [show, setShow] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getCurrentUser } = useContext(userDataContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + '/api/auth/registration',
        { name, email, password },
        { withCredentials: true }
      );

      getCurrentUser();
      navigate("/");
      toast.success("User Registration Successful");
      console.log(result.data);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "User Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const googleSignup = async () => {
    setLoading(true);
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name, email },
        { withCredentials: true }
      );

      console.log(result.data);
      getCurrentUser();
      navigate("/");
      toast.success("Google Registration Successful");
    } catch (err) {
      console.log(err);
      toast.error("Google Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-b from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start'>
      {/* Header */}
      <div className='w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
        <img className='w-[40px]' src={Logo} alt="logo" />
        <h1 className='text-[22px] font-sans'>OneCart</h1>
      </div>

      {/* Title */}
      <div className='w-full h-[100px] flex items-center justify-center flex-col gap-[10px]'>
        <span className='text-[25px] font-semibold'>Registration Page</span>
        <span className='text-[16px]'>Welcome to OneCart, place your order</span>
      </div>

      {/* Form Container */}
      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] rounded-lg shadow-lg flex items-center justify-center'>
        <form onSubmit={handleSignup} className='w-[90%] h-[90%] flex flex-col items-center gap-[20px]'>
          
          {/* Google Signup */}
          <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer'
            onClick={googleSignup}>
            <img src={google} alt="google" className='w-[20px]' />
            {loading ? "Processing..." : "Register with Google"}
          </div>

          {/* Divider */}
          <div className='w-full h-[20px] flex items-center justify-center gap-[10px]'>
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR 
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
          </div>

          {/* Inputs */}
          <div className='w-[90%] flex flex-col gap-[15px] relative'>
            <input type="text" autoComplete="username"
              className='w-full h-[50px] border border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='Username' required
              onChange={(e) => setName(e.target.value)} value={name} />

            <input type="email" autoComplete="email"
              className='w-full h-[50px] border border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='Email' required
              onChange={(e) => setEmail(e.target.value)} value={email} />

            <div className="relative w-full">
              <input type={show ? "text" : "password"} autoComplete="new-password"
                className='w-full h-[50px] border border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
                placeholder='Password' required
                onChange={(e) => setPassword(e.target.value)} value={password} />
              {show
                ? <IoEye className='absolute top-[15px] right-[15px] w-[20px] h-[20px] cursor-pointer' onClick={() => setShow(false)} />
                : <IoEyeOutline className='absolute top-[15px] right-[15px] w-[20px] h-[20px] cursor-pointer' onClick={() => setShow(true)} />
              }
            </div>

            {/* Submit */}
            <button className='w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>
              {loading ? <Loading /> : "Create Account"}
            </button>

            {/* Login Redirect */}
            <p className='flex gap-[10px]'>
              Already have an account? 
              <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer'
                onClick={() => navigate("/login")}>
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration;
