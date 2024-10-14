import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg'
function AuthLayouts({children}) {
  return (
    <div>
      <header className=" py-3 px-5 bg-white  bg-gradient-to-r from-purple-100 via-pink-100 to-red-100">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="chat app image" className="h-12 w-12" />
        <span className="text-2xl font-bold text-indigo-600">BuzzChat</span>
        </Link>
        </div>
      </header>
        
      { children }
    </div>
  )
}

export default AuthLayouts
