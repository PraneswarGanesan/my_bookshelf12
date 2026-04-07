import React from 'react'
import Video from './Video'

const HomeHerotext = () => {
  return (
    <div className='font-[font1] pt-5 text-center' >
      <div className='text-[9.5vw] justify-center uppercase leading-[8vw]'>The spark</div>
      <div className='text-[9.5vw] justify-center flex items-start uppercase leading-[8vw] flex ' >
        Who
        <div className='h-[10vw] w-[10vw] mt-4 rounded-full overflow-x-hidden '>
          <Video />
        </div> 
        generates</div>
      <div className='text-[9.5vw] justify-center uppercase leading-[8vw]'>the creativity</div>
    </div>
  )
}

export default HomeHerotext
