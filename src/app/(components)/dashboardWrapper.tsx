import React from 'react'
import Sidebar from './sidebar'
import Navbar from './navbar'

const dashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
    className={"light flex bg-gray-50 text-gray-900 w-full min-h-screen"}
  >
    <Sidebar />
    <main
     className='flex flex-col w-full h-full '
    >
      <Navbar />
      {children}
    </main>
  </div>
  )
}

export default dashboardWrapper