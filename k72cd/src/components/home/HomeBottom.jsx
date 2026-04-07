import React from 'react'
import { Link } from 'react-router-dom'

const HomeBottom = () => {
  return (
    <div className='font-[font2] flex items-center justify-center gap-2'>
            <div className='lg:border-3 border-2 hover:border-[#D3FD50] hover:text-[#D3FD50] lg:h-34 flex items-center px-3 pt-1 lg:px-8 border-white rounded-full uppercase'>
        <Link className='text-[4vw] lg:mt-2' to='/projects'>Projects</Link>
      </div>
      <div className='lg:border-3 border-2 hover:border-[#D3FD50] hover:text-[#D3FD50]  lg:h-34 flex items-center px-3 pt-1 lg:px-8 border-white rounded-full uppercase'>
        <Link className='text-[4vw] lg:mt-2' to='/agents'>agence</Link>
      </div>
    </div>
  )
}

export default HomeBottom