import React from 'react'
import { setPersistence, createUserWithEmailAndPassword, browserLocalPersistence, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { auth, db } from '../firebase-configs';
import SignUpForm from '../components/SignUpForm'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate()

  const usersRef = collection(db, 'users')

  const handleSignUp = (name, email, password) => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            // Signed up 
            const user = userCredential.user;
            await updateProfile(user, {
              displayName: name
            })
            
            await addDoc(usersRef, {
              uid: user.uid,
              displayName: name,
              email,
              saved: []
            })

            navigate('/profile')
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
          });
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
      <SignUpForm handleSignUp={handleSignUp} />
    </div>
  )
}

export default Signup