import React, { useEffect, useRef, useState } from 'react';
import uploadFile from '../helpers/uploadFile';
import Divider from './Divider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Upload, X } from 'lucide-react';

const EditUserDetails = ({ onClose, user }) => {
  const [data, setData] = useState({
    name: user?.name,
    profilePic: user?.profilePic
  });
  const [loading, setLoading] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const uploadPhotoRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      ...user
    }));
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    try {
      const uploadPhoto = await uploadFile(file);
      setData((prev) => ({
        ...prev,
        profilePic: uploadPhoto?.url
      }));
      setUploadPhoto(file);
    } catch (error) {
      toast.error('Failed to upload photo');
    } finally {
      setLoading(false);
    }
  };

  const handleClearUploadPhoto = () => {
    setUploadPhoto(null);
    setData((prev) => ({
      ...prev,
      profilePic: user?.profilePic
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/update`;
      const response = await axios.post(URL, data, { withCredentials: true });
      toast.success(response?.data?.message);

      if (response.data.success) {
        dispatch(setUser(response.data.data));
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update user details');
    }
  };

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10'>
      <div className='bg-white p-4 py-6 m-5 rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105 w-full max-w-sm'>
        <h2 className='text-center text-xl font-semibold text-gray-700'>Edit Profile Details</h2>

        <form className='grid gap-3 mt-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name' className='text-sm font-medium text-gray-600'>Name:</label>
            <input
              type='text'
              name='name'
              id='name'
              value={data.name}
              onChange={handleOnChange}
              className='w-full py-1 px-2 outline-none border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary transition'
            />
          </div>

          <div>
            <div className='text-sm font-medium text-gray-600'>Photo:</div>
            <div className='relative my-1 flex items-center gap-4'>
              <img
                src={data.profilePic}
                alt='Profile'
                className='w-10 h-10 rounded-full border border-gray-300'
              />
              <label htmlFor='profilePic' className='flex items-center justify-center w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-primary transition'>
                <input
                  type='file'
                  id='profilePic'
                  name='profilePic'
                  className='hidden'
                  onChange={handleUploadPhoto}
                  ref={uploadPhotoRef}
                />
                {loading ? (
                  <AiOutlineLoading3Quarters className='animate-spin w-4 h-4 mr-2 text-gray-600' />
                ) : (
                  <Upload className='w-4 h-4 mr-2 text-gray-600' />
                )}
                <span className='text-gray-600 truncate max-w-xs'>
                  {uploadPhoto ? uploadPhoto.name : 'Upload profile photo'}
                </span>
              </label>

              {uploadPhoto && (
                <button
                  onClick={handleClearUploadPhoto}
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 transition-colors'
                >
                  <X className='w-4 h-4' />
                </button>
              )}
            </div>
          </div>

          <Divider />
          <div className='flex gap-2 w-fit ml-auto'>
            <button
              onClick={onClose}
              className='border border-primary text-primary px-4 py-1 rounded-md transition-colors duration-150 hover:bg-primary  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='border border-primary bg-primary px-4 py-1 rounded-md transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
              disabled={loading}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetails;
