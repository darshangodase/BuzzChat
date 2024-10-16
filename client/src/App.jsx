import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer'
import toast, { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
    <Toaster />
    <div className="">
      
      <Outlet />
      <Footer />
    </div>
    </>
    
  )
}

export default App
