import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg'
function AuthLayouts({children}) {
  return (
    <div>
 <header className="py-3 px-5 bg-gradient-to-r from-rose-100 to-teal-100 shadow-inner">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="chat app image" className="h-12 w-12 transition-transform duration-300 ease-in-out transform group-hover:scale-110" />
          <span className="text-2xl font-bold text-indigo-700 group-hover:text-indigo-900 transition-colors duration-300 ease-in-out">
            BuzzChat
          </span>
        </Link>
      </div>
    </header>
      { children }
    </div>
  )
}

export default AuthLayouts
