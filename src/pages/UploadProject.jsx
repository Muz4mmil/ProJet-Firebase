import React, { useState } from 'react'
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import ProjectForm from '../components/ProjectForm';
import { db } from '../firebase-configs';
import AuthHelper from '../components/AuthHelper';

const UploadProject = ({ user }) => {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    projectImagesURLs: [],
    category: '',
    owner: user ? user.uid : null,
    teamType: 'solo',
    teamMembers: [],
    isOrganisationProject: false,
    organisation: '',
    githubLink: '',
    hostedLink: '',
  })

  const projectRef = collection(db, 'projects')

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await addDoc(projectRef, formData)
  }

  return (
    user ? (
    <div className='w-[80%] mx-auto'>
      <h1 className='my-16 text-3xl font-montserrat font-medium'>Upload New Project</h1>
      <ProjectForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
    </div >
    ) : (<AuthHelper />)
  )
}

export default UploadProject