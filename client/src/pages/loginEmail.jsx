import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const LoginEmail = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleRegister = () => {
    navigate('/register');
  };
  
  const user = useSelector(state => state.user);
  useEffect(()=>{
    if(user.token)
    {
      navigate("/home")
    }    
  },[user.token])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/login-email`;
    try {
      const response = await axios.post(URL, { email });
      toast.success(response.data.message);

      if(response.data.success) {
        navigate('/login-password', { state: { userId: response.data.userId } });
      }
    } 
    catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setEmail('');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-teal-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <Mail className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Verify Your Email</h1>
          <p className="text-gray-600 mt-2">Enter your email to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="abc@gamil.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                Continue
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button onClick={handleRegister} className="text-purple-500 hover:text-purple-700 font-semibold focus:outline-none">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginEmail;