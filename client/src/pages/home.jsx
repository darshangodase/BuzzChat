import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setUser } from '../redux/userSlice'
import axios from 'axios'
const home=() =>{
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
        console.log("user",user)
        if(response.data.data.logout)
        {
          dispatch(logout());
          navigate("/login-email")
        }
    } catch (error) {
        console.log("error",error)
    }
  }

  useEffect(()=>{
    fetchUserDetails()
  },[])

  return (
    <div className='min-h-screen'>
      home is here
    </div>
  )
}

export default home
