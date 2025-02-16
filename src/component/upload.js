import React, { useState } from "react";
import classNames from 'classnames/bind';
import styles from './upload.module.scss';
import { Button } from 'react-bootstrap';
import Returnfile from "../modals/return";
import axios from 'axios';
const cx = classNames.bind(styles);
const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");
//    const [isShowModalReturn, setIsShowModalReturn] = useState(false);
//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };
// const handleClose = () => {
//     setIsShowModalReturn(false);
// }
//   const handleUpload = async () => {
//     // setIsShowModalReturn(true);
//     if (!file) {
//       setMessage("Vui lòng chọn một file!");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("file", file);

//   const response = await fetch("http://127.0.0.1:5000/upload", {
//     method: "POST",
//     body: formData,
//   });

//   const data = await response.json(); // Chuyển phản hồi thành JSON
//   console.log("Response Data:", data); // In ra dữ liệu phản hồi

//   if (response.ok) {
//     setMessage("Tải lên thành công!");
//   } else {
//     setMessage(`Tải lên thất bại! Lỗi: ${data.message || "Không rõ lý do"}`);
//   }
//   };

//   return (
//     <div className={cx('container')}> 
//  <div className={cx('content')}>
//  <div className = {cx('header')}>
//       Upload file
//     </div>
//     <div className={cx('rule')}>
// <p>Maximum capacity per upload is 5GB.</p>
//     </div>
//       <input type="file" onChange={handleFileChange} />
//       <Button variant="primary" onClick={handleUpload}>Upload</Button>
//       {message && <p>{message}</p>}
//  </div>
// <Returnfile
// show = {isShowModalReturn}
// handleClose ={handleClose}
// />
//     </div>
//   );
const [file, setFile] = useState(null);
const [error, setError] = useState('');

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
     
     // Mở file trong tab mới
     window.open(url);
   })
   .catch((error) => {
     console.error('Lỗi khi hiển thị file PDF:', error);
   });
 
 
 
    
  }


return (
      <div className={cx('container')}> 
 <div className={cx('content')}>
 <div className = {cx('header')}>
      Upload file
    </div>
   <div className={cx('input')}>
   <input 
  type="file" 
  accept=".pdf" 
  onChange={handleFileChange} 
  className="custom-file-input"
/>
   </div>
   
     <Button variant="primary" onClick={handleSubmit}>Upload</Button>
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
