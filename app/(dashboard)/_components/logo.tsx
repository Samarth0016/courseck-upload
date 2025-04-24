import Image from "next/image";

import React from 'react'

const Logo = () => {
  return (
    <div>
        <div className="flex">
            <Image 
            height={50} width={50}
            alt = "logo"
            src = "/logo.svg"
            className="pt-2 pl-2"
            >
            </Image>
            <h1 className="pt-3 pl-4 text-lg font-bold text-blue-600">Courseck</h1>
        </div>
    </div>
  )
}

export default Logo
