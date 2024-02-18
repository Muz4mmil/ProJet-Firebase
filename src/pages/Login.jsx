import React from 'react'
import { setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from '../firebase-configs';
import SignInForm from '../components/SignInForm'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate()

  const handleSignIn = (email, password) => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        signInWithEmailAndPassword(auth, email, password);
        
        navigate('/profile')
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });

  }

  return (
    <div>
      <SignInForm handleSignIn={handleSignIn} />
    </div>
  )
}

export default Login