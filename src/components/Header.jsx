import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const user = useSelector((state) => state.user)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <header
    className={`header bg-white w-full grid grid-cols-2 lg:grid-cols-3 items-center py-4 px-[10%] max-h-16 overflow-hidden transition-all duration-500 lg:max-h-full ${isExpanded && 'max-h-96'}`}>
      <div className="logo text-3xl font-bold w-max">{'<'}ProJet{' />'}</div>

      <button className="lg:hidden col-span-1 justify-self-end"
        onClick={()=>setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div class="nav-links lg:mt-0 md:mt-4 col-span-2 lg:col-span-2 lg:flex lg:justify-end">
        <ul class="lg:flex lg:items-center lg:space-x-8 max-lg:space-y-4 max-md:mt-6 font-medium text-gray-900">
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/explore'}>Explore</Link></li>
          <li><Link to={'/profile/me'}>Profile</Link></li>
          {/* {user && <li><Link to={`/profile/${user.uid}`}>Profile</Link></li>} */}
          <li><Link to={'/upload'}>Upload</Link></li>
          {!user && <li><Link to={'/login'}><Button variant='outlined' size='small'>Login</Button></Link></li>}
        </ul>
      </div>
    </header>
  )
}

export default Header