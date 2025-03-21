import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';


const Header = () => {
  return (
    <header className="bg-blue-600 text-white sticky top-0 w-full p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left - Logo */}
        <Link href={'/'}>
        <div className="text-2xl font-bold">
          <span className="text-blue-500">Star Wars</span>
        </div>
        </Link>

        {/* Right - Icon */}
        <Link href="/favorites" >
        <Icon icon="mdi:heart" width="24" height="24"  style={{color: '#fff'}} />
        </Link>
              </div>
    </header>
  )
}

export default Header