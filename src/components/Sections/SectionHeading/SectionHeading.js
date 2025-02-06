import React from 'react'

const SectionHeading = ({title}) => {
  return (
    <div className='flex flex-wrap px-10 my-5 items-top gap-2'>
      <div className='bordern rounded border-spacing-1 bg-black w-2 h-8'>
      </div>
      <p className='text-2xl'>{title}</p>
    </div>
  )
}

export default SectionHeading