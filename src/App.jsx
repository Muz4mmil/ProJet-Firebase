import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from './firebase-configs';
import Login from './pages/Login'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import UploadProject from './pages/UploadProject'
import Header from './components/Header'
import Signup from './pages/Signup'
import Project from './pages/Project';

function App() {

  const [user, setUser] = useState();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    } else {
      // User is signed out
      console.log('no user found');
    }
  });
  

  return (
    <div className='bg-slate-100 min-h-screen'>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home user={user}/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/profile' element={<Profile user={user}/>}/>
        <Route path='/explore' element={<Explore user={user}/>}/>
        <Route path='/upload' element={<UploadProject user={user}/>}/>
        <Route path='/explore/project/:projectId' element={<Project user={user}/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
