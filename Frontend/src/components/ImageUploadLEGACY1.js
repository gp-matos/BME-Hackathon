import React, { useState } from 'react';
import './ImageUpload.css'; // Make sure to create this CSS file

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Handles file selection
  const onFileChange = event => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
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
        // Clear the preview and selected file state
        setPreviewUrl(null);
        setSelectedFile(null);
      } else {
        alert('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the image.');
    }
  };

  return (
    <div className="image-upload-container">
      <div className="file-input-container">
        <input type="file" id="file" accept="image/*" onChange={onFileChange} className="file-input" />
        <label htmlFor="file" className="file-label">
          Choose a file
        </label>
        <button onClick={onFileUpload} className="upload-button">Upload</button>
      </div>
      {previewUrl && (
        <div className="image-preview-container">
          <img src={previewUrl} alt="Preview" className="image-preview" />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;