import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase-configs';
import CardsContainer from '../components/CardsContainer'

const Explore = () => {
  const [projects, setProjects] = useState([])

  const projectsRef = collection(db, 'projects')

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(projectsRef)
      const projects = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setProjects(projects)
    }
    fetchProjects();
  }, [])

  const user = useSelector((state) => state.user);
  return (
    <div className='w-[80%] mx-auto'>
      <h1 className='my-16 text-3xl font-poppins font-medium'>Explore</h1>
      <CardsContainer projects={projects}/>
    </div>
  )
}

export default Explore