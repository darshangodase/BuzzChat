import React from 'react'
import logo from '../assets/logo.jpeg'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
      <footer id="contact"className="py-10 text-white py-3 flex bg-gradient-to-r from-teal-100 to-rose-100 shadow-inner">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <Link className=" flex gap-2 mt-3">
            <img src={logo} alt="chat app image " className="h-12 w-12" />
            <h3 className=" text-black text-2xl font-bold mt-2">BuzzChat</h3>
            </Link>
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
