import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Upload, X } from 'lucide-react';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    profile_pic:''
  });

  const [uploadPhoto, setUploadPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUploadPhoto = async(e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file)
    setUploadPhoto(file);
    setData((preve)=>{
      return{
        ...preve,
        profile_pic : uploadPhoto?.url
      }
    })
  };

  const handleClearUploadPhoto = (e) => {
    e.preventDefault();
    setUploadPhoto(null);
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/register`
    try {
        const response = await axios.post(URL,data)
        toast.success(response.data.message)
        if(response.data.success)
          {
            setData({
              name : "",
              email : "",
              password : "",
              profile_pic : ""
            })
            navigate('/login-email')
            setIsLoading(false);
            setUploadPhoto("");
          }
    } catch (error) {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);
        setData({
          name : "",
          email : "",
          password : "",
          profile_pic : ""
        })
        setUploadPhoto("");
    }
  };

  return (
    <div className="min-h-screen px-6 flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-white to-teal-50">
      <h3 className="mb-8 text-gray-50 font-bold text-2xl">Welcome To BuzzChat</h3>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md ">
        <div className="text-center mb-6">
          <UserPlus className="w-10 h-10 text-purple-500 mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">Join BuzzChat</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={data.name}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
              required
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={data.email}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="profile_pic" className="flex items-center justify-center w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm">
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="hidden"
              onChange={handleUploadPhoto}/>
              <Upload className="w-4 h-4 mr-2 text-gray-600" />
              <span className="text-gray-600 truncate">
                {uploadPhoto ? uploadPhoto.name : "Upload profile photo"}
              </span>
            </label>

            {uploadPhoto && (
              <button
                onClick={handleClearUploadPhoto}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center text-sm"
            disabled={isLoading}>
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login-email" className="text-purple-500 hover:text-purple-700 font-semibold">
              Log in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;