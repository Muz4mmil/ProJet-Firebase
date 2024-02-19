import React from 'react'
import Grid from '@mui/material/Grid';
import ProjectCard from './ProjectCard'
import { Link } from 'react-router-dom';


const CardsContainer = ({ projects }) => {

    return (
        <div className='w-[80vw] mx-auto'>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {projects.map((project, index) => (
                    <Grid item xs={4} sm={4} md={4} key={index}>
                        <ProjectCard project={project} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default CardsContainer