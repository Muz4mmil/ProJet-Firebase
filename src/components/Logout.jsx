import React from 'react'
import { signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from '../firebase-configs';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Logout = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth).then(() => {
      // Sign-out successful.
      console.log('Sign-out successful');
      window.location.href = '/'
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }

  return (
    <div className=' ml-[164px] max-sm:ml-[140px]'>
      <Button variant='contained' size='small' onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Logout