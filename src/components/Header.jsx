import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className=' p-4 flex justify-between w-[90%] mx-auto items-center border '>
      <div className="logo text-3xl font-bold">{'<'}ProJet{' />'}</div>
      <nav className="nav">
        <ul className='flex gap-4 items-center'>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/explore'}>Explore</Link></li>
          <li><Link to={'/profile'}>Profile</Link></li>
          <li><Link to={'/upload'}>Upload</Link></li>
          <li><Link to={'/login'}>Login</Link></li>
        </ul>
      </nav>

    </header>
  )
}

export default Header