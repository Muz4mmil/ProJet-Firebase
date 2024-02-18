import React, { useState, useEffect } from 'react'
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase-configs';
import Grid from '@mui/material/Grid';
import ProjectCard from './ProjectCard'
import { Link } from 'react-router-dom';


const CardsContainer = () => {
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

    return (
        <div className='w-[80vw] mx-auto'>
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
    )
}

export default CardsContainer