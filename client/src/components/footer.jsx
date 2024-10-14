import React from 'react'
import logo from '../assets/logo.jpeg'

function Footer() {
  return (
    <div>
      <footer id="contact"className=" py-10 bg-gradient-to-br from-indigo-300 via-purple-400 to-pink-500 text-white py-3 flex ">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className=" flex gap-2 mt-3">
            <img src={logo} alt="chat app image " className="h-12 w-12" />
            <h3 className=" text-black text-2xl font-bold mt-2">BuzzChat</h3>
            </div>
          </div>
          <div className="mt-8 text-center text-black text-lg font-medium">
            <p>&copy; 2024 BuzzChat. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
