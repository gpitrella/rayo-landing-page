import React from 'react'
import '@/app/styles/loader.css'

function Loader() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <span className ="loader"></span>
    </div>
  )
}

export default Loader