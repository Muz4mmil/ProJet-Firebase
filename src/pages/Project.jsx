import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase-configs';


const Project = ({user}) => {

  const { projectId } = useParams()
  const [project, setProject] = useState()

  const projectRef = doc(db, 'projects', projectId)

  useEffect(() => {
    const unsubscribe = async () => {
      const project = await getDoc(projectRef);
      setProject(project.data())
    }

    return () => unsubscribe();
  }, [])


  return (
    <div className='w-[80%] my-6 mx-auto'>
      {project ? (
        <>
          <div className="images my-6 flex gap-4 overflow-scroll">
            {
              project.projectImagesURLs.map((url, index)=>(
                <img key={index} src={url} className='h-72 object-cover'/>
              ))
            }
          </div>
          <div className="info">
            <h1 className='my-6 text-3xl font-montserrat font-medium'>{project.name}</h1>
            <p>Muzammil Siddiqui | {project.category}</p>
            <h5 className='mt-8 mb-1 text-xl font-bold font-montserrat'>Description:</h5>
            <p className=''>{project.description}</p>
            {
              project.teamType == 'team' ? (<>
                <h5 className='mt-8 mb-1 text-xl font-bold font-montserrat'>Team Members:</h5>
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
                <h5 className='mt-8 mb-1 text-xl font-bold font-montserrat'>Organisation:</h5>
                <p>{project.organisation}</p>
              </>)
            }
            {
              (project.githubLink || project.hostedLink) && (<>
                <h5 className='mt-8 mb-1 text-xl font-bold font-montserrat'>Links:</h5>
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