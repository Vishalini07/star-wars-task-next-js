import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white text-center py-4">
      © {new Date().getFullYear()} Star Wars App. All rights reserved.
    </footer>
  )
}

export default Footer