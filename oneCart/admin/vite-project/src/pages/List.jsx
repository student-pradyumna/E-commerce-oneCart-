  import React from 'react'
import Nav from '../components/Nav.jsx'
import Sidebar from '../components/Sidebar.jsx'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext.jsx'
import { useEffect } from 'react'
import axios from 'axios'
 


function List() {
  let [list, setList]=useState([])
  let {serverUrl}=useContext(authDataContext)

  const fetchList=async ()=>{
    
    try{
    let result=await axios.get(serverUrl +'/api/product/list')
    setList(result.data)
    console.log(result.data)
    
    }catch(err){
     console.log(err)
    }
  }

 const removeList = async (id) => {
  try {
    let result = await axios.delete(
      `${serverUrl}/api/product/remove/${id}`,
       
      { withCredentials: true }
    );

    if (result.data) {
      fetchList();
    } else {
      console.log("Failed to remove product");
    }
  } catch (err) {
    console.log(err);
  }
};



  useEffect(()=>{
   fetchList()
  },[])
  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white]'>
      <Nav/>
      <div className='w-[100%] h-[100%] flex items-center justify-start'>
        <Sidebar/>
        <div className='w-[82%] h-[100%] lg:ml-[300px] md:ml-[230px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px]'>

          <div className='w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[20px] text-white'>All Listed Products</div>

           { list?.length > 0 ? ( list.map((item,index)=>( <div className='w-[90%] md:h-[120px] h-[90px] bg-slate-600 rounded-xl flex items-center justify-start gap-[5px] md:gap-[30px] p-[10px] md:px-[30px]' key={index}>
 <img src={item.image1} className='w-[30%] md:w-[120px] h-[90%] rounded-lg' alt=""/>
    <div className='w-[90%] h-[80%] flex flex-col items-start justify-start gap-[2px]'>
      <div className='w-[100%] md:text-[20px] text-[15px] text-[#bef0f3]'> {item.name} </div>
      <div className='md:text-[17px] text-[15px] text-[#bef3da]'>{item.category}</div>
      <div className='md:text-[17px] text-[15px] text-[#bef3da]'>₹{item.price}</div>
    </div>
    <div className='w-[10%] h-[100%] bg-transparent flex items-center justify-center'>
      <span className='w-[35px] h-[30%] flex items-center justify-center rounded-md md:hover:bg-red-300 md:hover:text-black cursor-pointer hover:text-red-300 ' onClick={()=>removeList(item._id)}>X</span>
    </div>
            </div>
            
          )) ) :( <div className='text-white text-lg '>No products available.</div> ) }
        </div>

      </div>
    </div>
  )
}

export default List