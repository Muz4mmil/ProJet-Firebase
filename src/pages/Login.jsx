import React from 'react'
import { setPersistence, signInWithEmailAndPassword, browserLocalPersistence, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { db, auth } from '../firebase-configs';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import SignInForm from '../components/SignInForm'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate()

  const handleSignIn = (email, password) => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password);
        navigate('/profile/me')
      })
      .catch((error) => {
        // Handle Errors here.
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
      <SignInForm handleSignIn={handleSignIn} handleGoogleSignIn={handleGoogleSignIn}/>
    </div>
  )
}

export default Login