import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Logout from '../components/Logout'
import { collection, getDocs, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase-configs';
import Grid from '@mui/material/Grid';
import ProjectCard from '../components/ProjectCard'
import AuthHelper from '../components/AuthHelper';

const Profile = ({ user }) => {

  const [projects, setProjects] = useState([])

  const projectsRef = collection(db, 'projects')

  useEffect(() => {
    if(user){
      console.log(user);
      const queryProjects = query(projectsRef, where('owner', '==', user.uid))
      const unsubscribe = onSnapshot(queryProjects, (snapshot) => {
        const projects = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        setProjects(projects)
      })
      return () => unsubscribe()
    }
    // const querySnapshot = await getDocs(projectsRef)
  }, [])


  return (
    user ? (

    <div className='w-[80%] mx-auto'>
      <h1 className='my-16 text-3xl font-montserrat font-medium'>Profile</h1>
      <div className="user-info">
        {user && (<>
          <h4>{user.displayName}</h4>
          <h4>{user.uid}</h4>
          <h4>{user.email}</h4>
        </>)}
        <Logout />
      </div>
      <div className="my-projects">
        <h1 className='my-16 text-3xl font-montserrat font-medium'>My Projects</h1>
        <div className="project-container">
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {projects.map((project, index) => (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <Link to={`/explore/project/${project.id}`}>
                  <ProjectCard project={project} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
    ) : (<AuthHelper />)
  )
}

export default Profile