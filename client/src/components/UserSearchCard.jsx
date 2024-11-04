import React from 'react';
import { Link } from 'react-router-dom';

const UserSearchCard = ({ user, onClose }) => {
  return (
    <Link to={"/home/" + user?._id} onClick={onClose} className='flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border hover:border-teal-400 rounded cursor-pointer'>
      <div>
        <img
          src={user.profilePic || '/default-avatar.png'}
          width={40}
          height={40}
          alt='Profile'
          className='rounded-full'
        />
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