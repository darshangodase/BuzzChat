import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import logo from '../assets/logo.jpeg';

function AuthLayouts({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleLogout = async () => {
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/logout`;
      const response = await axios.get(URL, { withCredentials: true });

      if (response.data.success) {
        dispatch(logout());
        localStorage.removeItem('token');
        toast.success('Logged out successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to logout. Please try again.');
    }
  };

  return (
    <div className=''>
      <header className="py-3 px-5 bg-gradient-to-r from-rose-100 to-teal-100 shadow-inner">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="chat app image" className="h-12 w-12 transition-transform duration-300 ease-in-out transform group-hover:scale-110" />
            <span className="text-2xl font-bold text-indigo-700 group-hover:text-indigo-900 transition-colors duration-300 ease-in-out">
              BuzzChat
            </span>
          </Link>
          {/* {user.token && (
            <button
              onClick={handleLogout}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Logout
            </button>
          )} */}
        </div>
      </header>
      {children}
    </div>
  );
}

export default AuthLayouts;