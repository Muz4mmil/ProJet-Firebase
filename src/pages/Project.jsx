import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase-configs';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import LinkIcon from '@mui/icons-material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ShareIcon from '@mui/icons-material/Share';
import { Button } from '@mui/material';

const Project = () => {
  const user = useSelector((state) => state.user);

  const { projectId } = useParams()
  const [project, setProject] = useState()
  const [projectOwner, setProjectOwner] = useState()

  const projectRef = doc(db, 'projects', projectId)

  useEffect(() => {
    const unsubscribe = async () => {
      const project = await getDoc(projectRef);
      const projectData = await project.data()
      setProject(projectData)

      const userRef = doc(db, 'users', projectData.owner)
      const owner = await getDoc(userRef);
      const ownerData = await owner.data()
      setProjectOwner(ownerData)
    }

    return () => unsubscribe();
  }, [])


  return (
    <div className='w-[80%] my-6 mx-auto'>
      {project && projectOwner ? (
        <>
          <div className="images max-w-max my-6 flex gap-4 overflow-x-scroll">
            {project.projectImagesURLs.map((url, index) => (
              <img key={index} src={url} className='max-h-72 object-cover mb-2' />
            ))}
          </div>

          <div className="info">
            <h1 className='my-4 text-3xl font-poppins font-medium'>{project.name}</h1>
            <div className='flex gap-5'>
              <p className=' flex items-center gap-2'><PersonIcon />{projectOwner.displayName || 'unknown'}</p>
              <p>|</p>
              <p className=' flex items-center gap-2'><CategoryIcon />{project.category}</p>
            </div>
            <h5 className='mt-8 mb-1 text-xl font-bold font-poppins'>Description:</h5>
            <p className=''>{project.description}</p>
            {
              project.teamType == 'team' ? (<>
                <h5 className='mt-8 mb-1 text-xl font-bold font-poppins'>Team Members:</h5>
                <ol className='ml-10 list-decimal'>
                  {project.teamMembers.map((member) => (
                    <li>
                      <p>{member.name}</p>
                    </li>
                  ))}
                </ol>
              </>) : null
            }
            {
              project.isOrganisationProject && (<>
                <h5 className='mt-8 mb-1 text-xl font-bold font-poppins'>College / Organisation:</h5>
                <p>{project.organisation}</p>
              </>)
            }
            {
              (project.githubLink || project.hostedLink) && (<>
                <h5 className='mt-8 mb-1 text-xl font-bold font-poppins'>Links:</h5>
                {project.hostedLink && (<>
                  <p className='mb-2 flex items-center gap-2'><LinkIcon />Link : <a href={project.hostedLink.startsWith('https://') ? project.hostedLink : 'https://' + project.hostedLink} className='text-sky-700 ml-2' target='_blank'>{project.hostedLink}</a></p>

                </>)}
                {project.githubLink && (<>
                  <p className='mb-2 flex items-center gap-2'><GitHubIcon />GitHub : <a href={project.githubLink.startsWith('https://') ? project.githubLink : 'https://' + project.githubLink} className='text-sky-700 ml-2' target='_blank'>{project.githubLink}</a></p>
                </>)}
              </>)
            }
            <h5 className='mt-8 mb-1 text-xl font-bold font-poppins'>Contact:</h5>
            <p className='mb-2 flex items-center gap-2'><AlternateEmailIcon />Email : {projectOwner.email}</p>

            <div className='flex gap-4 item-center mt-10'>
              <ShareIcon/>
              <Button
                variant='outlined'
                size='small'
                sx={{ width: 'max-content' }}
                onClick={(e) => {
                  navigator.clipboard.writeText(`https://projet-app.web.app/explore/project/${project.id}`);
                  e.target.innerHTML = 'Link Copied';
                  setTimeout(() => {
                    e.target.innerHTML = "Share Project Link";
                  }, 1500)
                }}
              >
                Share Project Link
              </Button>
            </div>
          </div>
        </>) : (<>Loading...</>)}
    </div>
  )
}

export default Project