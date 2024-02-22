import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { storage } from '../firebase-configs'
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function FileUpload({ setFormData }) {

  const [files, setFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const handleFilesUpload = async (e) => {
    const files = e.target.files;
    setFiles(files)
    
    setIsUploading(true)
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `projectImages/${file.name}`)
      const uploadTask = await uploadBytesResumable(storageRef, file);
      uploadTask.task.on('state_changed',
        (snapshot) => {

        },
        (error) => {
          console.log(error);
        },
        (snapshot) => {
          getDownloadURL(uploadTask.task.snapshot.ref).then((downloadURL) => {
            setFormData((prev) => ({
              ...prev,
              projectImagesURLs: [...prev.projectImagesURLs, downloadURL],
            }))
          });
        }
      );
    }
    
    document.getElementById('upload-helper').innerHTML = 'Uploaded'
    document.getElementById('upload-helper').style.color = 'green'
  }

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
      // startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput type="file" accept="image/*" multiple onChange={handleFilesUpload} />
      </Button>
      {isUploading && (<p id='upload-helper' className='mt-1 text-sm'>Uploading...</p>)}
    </>
  );
}