import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserSearchCard = ({ user, onClose }) => {
  const onlineUser = useSelector(state => state?.user?.onlineUser)
  const isOnline = onlineUser.includes(user?._id)
  
  return (
    <Link to={"/home/" + user?._id} onClick={onClose} className='flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:bg-slate-100 rounded cursor-pointer'>
      <div className='relative w-10 h-10'>
        <img
          src={user.profilePic || '/default-avatar.png'}
          alt='Profile'
          className='rounded-full w-full h-full object-cover border border-gray-700'
        />
        {isOnline && (
          <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></div>
        )}
      </div>
      <div>
        <div className='font-semibold text-ellipsis line-clamp-1'>
          {user?.name}
        </div>
        <p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
      </div>
    </Link>
  );
};

export default UserSearchCard;