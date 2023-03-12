import React, { useState } from 'react';
import axios from 'axios';

function FileUpload1() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" multiple onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
}

export default FileUpload1;
