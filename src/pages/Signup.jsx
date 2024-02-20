import React from 'react'
import { setPersistence, createUserWithEmailAndPassword, browserLocalPersistence, updateProfile, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
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

            navigate('/profile/me')
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

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(async(result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        const usersRef = doc(db, 'users', user.uid)

        await setDoc(usersRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          saved: []
        })

        navigate('/profile/me')

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <div>
      <SignUpForm handleSignUp={handleSignUp} handleGoogleSignIn={handleGoogleSignIn} />
    </div>
  )
}

export default Signup