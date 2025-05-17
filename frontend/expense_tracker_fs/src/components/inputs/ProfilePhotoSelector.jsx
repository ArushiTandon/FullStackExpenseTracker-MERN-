import React, { useState, useRef, useEffect, useContext } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';
import { UserContext } from '../../context/userContext';

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (image) {
      const preview = URL.createObjectURL(image);
      setPreviewUrl(preview);
      return () => URL.revokeObjectURL(preview);
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const displayImage = previewUrl || user?.profileImageUrl;

  return (
    <div className="flex justify-center mb-4">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {displayImage ? (
        <div className="relative">
          <img
            src={displayImage}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
          {previewUrl && (
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute bottom-1 right-1"
              onClick={handleRemoveImage}
            >
              <LuTrash />
            </button>
          )}
        </div>
      ) : (
        <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
          <LuUser className="text-4xl text-primary" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute bottom-1 right-1"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
