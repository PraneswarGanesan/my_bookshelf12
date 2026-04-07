import React from 'react'

const Video = () => {
  return (
    <div>
    <div className='h-full w-full'>
        <video className='h-full w-full object-cover'autoPlay loop muted src="../../../public/video.mp4"></video>
      </div>
    </div>
  )
}

export default Video
