import './App.css'
import { useEffect } from 'react'
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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: 'SET_USER', payload: user });
      } else {
        dispatch({ type: 'CLEAR_USER' });
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className='bg-slate-50 min-h-[100svh] relative pb-20'>
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
          <Route path='/explore/project/:projectId' element={<Project />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
