import React, { useState } from 'react';
import './ImageUpload.css'; // Make sure this file exists and contains the necessary styles

function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  // Handles file selection
  const onFileChange = event => {
    const files = Array.from(event.target.files);
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
  };

  // Handles individual file upload
  const onFileUpload = async () => {
    if (!selectedFiles.length) {
      alert('Please select files to upload');
      return;
    }

    for (let file of selectedFiles) {
      const formData = new FormData();
      formData.append('image', file, file.name);

      try {
        const response = await fetch('http://localhost:5001/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          alert('Failed to upload image. Please try again.');
          // If you want to stop uploading the rest of the files after a failure,
          // uncomment the following line:
          // break;
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while uploading the image.');
        // If you want to stop uploading the rest of the files after an error,
        // uncomment the following line:
        // break;
      }
    }

    // Clear the previews and selected files state after all uploads (or on failure if you break the loop)
    setPreviewUrls([]);
    setSelectedFiles([]);
    alert('All images uploaded successfully!');
  };

  return (
    <div className="image-upload-container">
      <div className="file-input-container">
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={onFileChange}
          className="file-input"
          multiple
        />
        <label htmlFor="file" className="file-label">
          Choose files
        </label>
        <button onClick={onFileUpload} className="upload-button">
          Upload All
        </button>
      </div>
      <div className="image-preview-container">
        {previewUrls.map((previewUrl, index) => (
          <div key={index} className="image-preview-wrapper">
            <img src={previewUrl} alt={`Preview ${index}`} className="image-preview" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
