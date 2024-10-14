import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer'

function App() {

  return (
    <div className="">
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
