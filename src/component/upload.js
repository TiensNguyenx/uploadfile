import React, { useState,useRef } from "react";
import classNames from 'classnames/bind';
import styles from './upload.module.scss';
import { Button } from 'react-bootstrap';
import Returnfile from "../modals/return";
import { FaUpload } from "react-icons/fa";
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";
const cx = classNames.bind(styles);
const FileUpload = () => {

const [file, setFile] = useState(null);
const [error, setError] = useState('');
const fileInputRef = useRef(null);
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

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!file) {
    setError('Please select a PDF file.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file); // Key là 'file', value là file PDF
  axios.post('http://127.0.0.1:5000/upload', formData, {
    headers: { 
     'Content-Type': 'multipart/form-data'
   },
   responseType: 'blob'
 })
   .then((response) => {
     const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
     const a = document.createElement('a');
     a.href = url;
     a.download = 'file.pdf'; 
     document.body.appendChild(a);
     a.click();
     document.body.removeChild(a);
     window.URL.revokeObjectURL(url);
   })
   .catch((error) => {
     console.error('Error displaying PDF file', error);
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
{/* <Returnfile
show = {isShowModalReturn}
handleClose ={handleClose}
/> */}
    </div>
);
};
export default FileUpload;
