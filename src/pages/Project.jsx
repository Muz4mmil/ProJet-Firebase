import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase-configs';


const Project = () => {
  const user = useSelector((state) => state.user);

  const { projectId } = useParams()
  const [project, setProject] = useState()

  const projectRef = doc(db, 'projects', projectId)

  useEffect(() => {
    const unsubscribe = async () => {
      const project = await getDoc(projectRef);
      const projectData = project.data()
      setProject(projectData)
    }

    return () => unsubscribe();
  }, [])


  return (
    <div className='w-[80%] my-6 mx-auto'>
      {project ? (
        <>
          <div className="images my-6 flex gap-4 overflow-x-scroll">
            {
              project.projectImagesURLs.map((url, index) => (
                <img key={index} src={url} className='h-72 object-cover' />
              ))
            }
          </div>
          <div className="info">
            <h1 className='my-6 text-3xl font-poppins font-medium'>{project.name}</h1>
            <p>{project.ownerName || 'unknown'} | {project.category}</p>
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
                <h5 className='mt-8 mb-1 text-xl font-bold font-poppins'>Organisation:</h5>
                <p>{project.organisation}</p>
              </>)
            }
            {
              (project.githubLink || project.hostedLink) && (<>
                <h5 className='mt-8 mb-1 text-xl font-bold font-poppins'>Links:</h5>
                {project.hostedLink && (<>
                  <p>Link : <a href={project.hostedLink}>{project.hostedLink}</a></p>

                </>)}
                {project.githubLink && (<>
                  <p>GitHub : <a href={project.githubLink}>{project.githubLink}</a></p>

                </>)}
              </>)
            }
          </div>
        </>) : (<>Loading...</>)}
    </div>
  )
}

export default Project