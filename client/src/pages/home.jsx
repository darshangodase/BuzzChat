import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setUser } from '../redux/userSlice'
import axios from 'axios'
import toast from 'react-hot-toast'
import Sidebar from '../components/Sidebar'

const home =() =>{
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const fetchUserDetails = async()=>{
    try {
        const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user`
        const response = await axios({
          url : URL,
          withCredentials : true
        })
        dispatch(setUser(response.data.data))
        if(response.data.data.logout)
        {
          dispatch(logout());
          navigate("/login-email")
        }
    } catch (error) {
        toast.error("Failed to fetch user details");
    }
  }

  useEffect(()=>{
    fetchUserDetails()
  },[user])
  const basePath = location.pathname === '/home'

  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
         <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
           <Sidebar/>
        </section>
       <section className={`${basePath && "hidden"}`} >
            <Outlet/>
        </section>
    </div>
  )
}

export default home
