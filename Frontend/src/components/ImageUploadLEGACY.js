import React, { useState } from 'react';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handles file selection
  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  // Handles file upload
  const onFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile, selectedFile.name);

    try {
      const response = await fetch('http://localhost:5001/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Image uploaded successfully!');
      } else {
        alert('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the image.');
    }
  };

  return (
    <div>
      <input type="file" accept=".png" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
    </div>
  );
}

export default ImageUpload;
