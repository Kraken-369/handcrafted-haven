'use client';
import React, { useState } from "react";
import { Button } from '@/app/ui/button';

interface ProfileProps {
  userId: string;
  bio: string;
  setBio: (bio: string) => void;
  image: string | null;
  setImage: (image: string | null) => void;
}

const Profile: React.FC<ProfileProps> = ({ userId, bio, setBio, image, setImage }) => {
  const [editMode, setEditMode] = useState(false);
  const [tempBio, setTempBio] = useState(bio);

  const handleSave = () => {
    setBio(tempBio);
    setEditMode(false);
    saveToDatabase(tempBio, image);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveToDatabase = async (bio: string, image: string | null) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio, profileImage: image }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      console.log("Profile updated!");
    } catch (err) {
      console.error("Failed to save profile:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

      <div className="flex flex-col items-center justify-center mb-4">
        {editMode ? (
          <>
            <textarea
              className="w-full max-w-md p-2 border rounded mb-2"
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
            />
            <Button onClick={handleSave}>Save</Button>
          </>
        ) : (
          <>
            <p className="text-center mb-2 max-w-md">{bio}</p>
            <Button onClick={() => setEditMode(true)}>Edit Bio</Button>
          </>
        )}
      </div>

      {image && (
        <img
          src={image}
          alt="Profile"
          className="w-12 h-12 rounded-full mb-4"
        />
      )}

      <div className="flex justify-center mt-4">
        <label className="bg-gray-400 text-white px-4 py-2 flex items-center justify-center gap-2 rounded cursor-pointer">
          Upload Image
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>
        </label>
      </div>
    </div>
  );
};

export default Profile;
