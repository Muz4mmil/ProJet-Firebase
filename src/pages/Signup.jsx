import React from 'react'
import { setPersistence, createUserWithEmailAndPassword, browserLocalPersistence, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { auth, db } from '../firebase-configs';
import SignUpForm from '../components/SignUpForm'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate()


  const handleSignUp = (name, email, password) => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user = userCredential.user;
            await updateProfile(user, {
              displayName: name
            })

            const usersRef = doc(db, 'users', user.uid)

            await setDoc(usersRef, {
              uid: user.uid,
              displayName: name,
              email,
              saved: []
            })

            navigate('/profile/user.uid')
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
          });
      })
      .catch((error) => {
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