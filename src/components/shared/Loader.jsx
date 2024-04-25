import Image from 'next/image'
import React from 'react'

const Loader = ({ width, height, className }) => {
  return (
    <Image
      src="/assets/loader.svg"
      alt="loader"
      width={width}
      height={height}
      className={className}
    />
  )
}

export default Loader