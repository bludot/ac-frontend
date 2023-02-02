import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function Layout() {
  return (<div className="app">
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <div className="header">One</div>
    <div className="main">
      <Outlet />
    </div>
    
    
  </div>)
}