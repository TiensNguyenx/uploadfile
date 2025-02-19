import React, { useState,useRef } from "react";
import classNames from 'classnames/bind';
import styles from './upload.module.scss';
import { Button } from 'react-bootstrap';
import Loading from "../modals/loading";
import { FaUpload } from "react-icons/fa";
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";
const cx = classNames.bind(styles);
const FileUpload = () => {
const [file, setFile] = useState(null);
const [error, setError] = useState('');
const fileInputRef = useRef(null);
const [showModalLoading, setShowModalLoading] = useState(false);
const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    setFile(selectedFile);
    setError('');
  } else {
    setFile(null);
    setError('Please select a PDF file.');
  }
};
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const handleClose = () => {
  setShowModalLoading(false);
}
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!file) {
    setError('Please select a PDF file.');
    return;
  }
  const formData = new FormData();
  formData.append('file', file); // Key là 'file', value là file PDF
  setShowModalLoading(true);
  axios.post('http://127.0.0.1:5000/upload', formData, {
    headers: { 
     'Content-Type': 'multipart/form-data'
   },
   responseType: 'blob'
 })
 .then( async (response) =>  {
  const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/zip' }));
  // await delay(50000);
  setShowModalLoading(false);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${file.name.replace(/\.pdf$/, '')}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
})
   .catch((error) => {
     console.error('Error displaying file', error);
   });
  }
return (
      <div className={cx('container')}> 
 <div className={cx('content')}>
 <div className = {cx('header')}>
      Upload file
    </div>
    <div style={{marginBottom:'40px',fontSize:'17px',fontWeight:'100'}}>Only PDF files are supported</div>
   <div className={cx('input')}>
   <input 
  type="file" 
  accept=".pdf" 
  onChange={handleFileChange} 
  ref={fileInputRef}
/>
<button className={cx('button')} onClick={() => {
   setFile(null);
   if (fileInputRef.current) {
     fileInputRef.current.value = ""; // Reset input file
   }
}}>
<MdDeleteForever fontSize='30px' color="red"/>
</button>
   </div>

     <Button variant="primary" onClick={handleSubmit} size="lg" style={{padding:'5px 15px'}}><FaUpload style={{textAlign:'center', margin:'0 10px 6px 0'}}/>Upload</Button>
      {error && <p style={{color:'red',marginTop:'10px'}}>{error}</p>}
 </div>
<Loading
show = {showModalLoading}
handleClose ={handleClose}
/>
    </div>
);
};
export default FileUpload;
