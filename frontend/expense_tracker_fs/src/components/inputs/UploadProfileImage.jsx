import React, { useState, useContext } from 'react';
import ProfilePhotoSelector from './ProfilePhotoSelector';
import axiosInstance from '../../util/axiosInstance';
import { API_PATHS } from '../../util/apiPaths';
import { UserContext } from '../../context/userContext';

const UploadProfileImage = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { user, updateUser } = useContext(UserContext);

  const handleUpload = async () => {
    if (!image) return alert('Please select an image first!');

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', image);

      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not authenticated');
        return;
      }

      const response = await axiosInstance.post(
        API_PATHS.IMAGE.UPLOAD_IMAGE,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log("Upload response:", response.data);
      if (response.data?.profileImageUrl) {
        updateUser({
          ...user,
          profileImageUrl: response.data.profileImageUrl,
        });
        alert('Image uploaded successfully!');
        setImage(null);
      } else {
        alert('Upload failed: No image URL returned');
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('Upload failed, please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-2">
      <ProfilePhotoSelector image={image} setImage={setImage} />
      {image && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="text-sm text-white bg-primary px-3 py-1 rounded"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      )}
    </div>
  );
};

export default UploadProfileImage;
