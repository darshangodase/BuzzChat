import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { logout, setUser } from '../redux/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import logo from '../assets/logo.jpeg';

const Home = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user`;
      const response = await axios({
        url: URL,
        withCredentials: true
      });

      dispatch(setUser(response.data.data));
      if (response.data.data.logout) {
        dispatch(logout());
        navigate("/login-email");
      }
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [user]);

  const basePath = location.pathname === '/home';

  return (
    <div className='grid lg:grid-cols-[420px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      {basePath && (
        <div className='bg-slate-200 justify-center items-center flex-col gap-2 hidden lg:flex'>
          <div>
            <img
              src={logo}
              width={250}
              alt='logo'
            />
          </div>
          <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
        </div>
      )}
    </div>
  );
};

export default Home;