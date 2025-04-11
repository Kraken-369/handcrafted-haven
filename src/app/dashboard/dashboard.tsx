"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Profile from './profile';

const Dashboard: React.FC = () => {
  const [bio, setBio] = useState('This is my bio.');
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState('user123');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Dashboard</h1>
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Profile Summary</h2>
        
        {image ? (
          <div className="flex justify-center mb-4">
            <Image
              src={image}
              alt="Profile"
              width={128}
              height={128}
              className="rounded-full"
              style={{ width: '8rem', height: '8rem' }}
            />
          </div>
        ) : (
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-lg text-gray-500">No Image</span>
            </div>
          </div>
        )}
        
        <p className="text-center text-gray-600">{bio}</p>
      </section>
      <Profile 
        username={username} 
        bio={bio} 
        setBio={setBio} 
        image={image} 
        setImage={setImage} 
      />
    </div>
  );
};

export default Dashboard;
