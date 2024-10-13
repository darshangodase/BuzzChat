import React from 'react'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1 className="">this is home</h1>
      <Outlet />
    </div>
  )
}

export default Home
