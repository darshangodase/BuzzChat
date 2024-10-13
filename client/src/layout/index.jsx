import React from 'react'
import logo from '../assets/logo.jpeg'
function AuthLayouts({children}) {
  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
          <img src={logo} alt="chat app image " className="h-12 w-12" />
          <span className="text-2xl font-bold text-indigo-600">BuzzChat</span>
          </div>
        </div>
      </header>
        { children }
    </div>
  )
}

export default AuthLayouts
