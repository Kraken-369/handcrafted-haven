"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Profile from './profile';

const Dashboard: React.FC = () => {
  const [bio, setBio] = useState('This is my bio.');
  const [image, setImage] = useState<string | null>(null);

  return (
    <div>
      <h1>Dashboard</h1>
      <section className="mb-8 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center">Profile Summary</h2>
        {image && (
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
        )}
        <p className="text-center">{bio}</p>
      </section>

      <Profile bio={bio} setBio={setBio} image={image} setImage={setImage} />
    </div>
  );
};

export default Dashboard;
