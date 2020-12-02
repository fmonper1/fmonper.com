import * as React from 'react'
import Image from 'next/image'

const LoadingPage = () => {
  return (
    <div className="w-screen h-screen bg-primary-main flex justify-center items-center">
      <Image
        src="/icon2x.png"
        width={141}
        height={135}
        className="animate-spin"
      />
    </div>
  )
}

export default LoadingPage
