import React from 'react'

function AuthLayouts({children}) {
  return (
    <div>
        <div className="">
            Logo
        </div>
        {children}
    </div>
  )
}

export default AuthLayouts
