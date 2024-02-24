import './App.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from './firebase-configs';
import Login from './pages/Login'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile'
import UploadProject from './pages/UploadProject'
import Header from './components/Header'
import Signup from './pages/Signup'
import Project from './pages/Project';
import Footer from './components/Footer';
import Loader from './components/Loader'
import EditProject from './pages/EditProject';

function App() {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    console.log('ProJet - Made by Muzammil (https://muz4mmil.vercel.app)')
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: 'SET_USER', payload: user });
        setIsReady(true)
      } else {
        dispatch({ type: 'CLEAR_USER' });
        setIsReady(true)
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    isReady ? <div className='bg-slate-50 min-h-[100dvh] relative pb-20 max-sm:pb-24'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile/me' element={<Profile />} />
          <Route path='/profile/:uid' element={<UserProfile />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/upload' element={<UploadProject />} />
          <Route path='/edit/:projectId' element={<EditProject />} />
          <Route path='/explore/project/:projectId' element={<Project />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div> :
      <div className='h-[100dvh] w-full relative'>
        {/* <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <CircularProgress/>
        </div> */}
        <Loader />
      </div>
  )
}

export default App
