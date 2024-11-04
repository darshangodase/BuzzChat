import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import UserSearchCard from './UserSearchCard';
import { X } from 'lucide-react'; 
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Import the loader icon

const SearchUser = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers('');
  }, []);

  const fetchUsers = async (query) => {
    setLoading(true);
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/search-user`;
      const response = await axios.post(URL, { search: query }, { withCredentials: true });

      if (response.data.success) {
        setSearchResults(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(searchQuery);
  };

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10'>
      <div className='bg-white p-4 py-6 m-5 rounded-lg shadow-lg w-full max-w-sm relative'>
        <button onClick={onClose} className='absolute top-2 right-2 text-gray-500 hover:text-red-500'>
          <X className='w-6 h-6' />
        </button>
        <h2 className='text-center text-xl font-semibold text-gray-700'>Search Users</h2>
        <form onSubmit={handleSearch} className='grid gap-3 mt-3'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search users by name or email'
            className='w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary'
          />
          <button type='submit' className='w-full py-2 px-4 bg-teal-400 font-semibold rounded-md hover:bg-teal-500 transition duration-300 ease-in-out'>
            Search
          </button>
        </form>
        <div className='mt-4'>
          {loading ? (
            <div className='flex justify-center items-center'>
              <AiOutlineLoading3Quarters className='animate-spin w-8 h-8 text-gray-600' />
            </div>
          ) : (
            searchResults.map((user) => (
              <UserSearchCard key={user._id} user={user} onClose={onClose} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;