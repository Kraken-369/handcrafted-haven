"use client";
import React, { useState } from 'react';
import Profile from './profile';

const Dashboard: React.FC = () => {
  const [bio, setBio] = useState('This is my bio.');
  const [image, setImage] = useState<string | null>(null);

  return (
    <div>
      <h1>Dashboard</h1>
      <Profile bio={bio} setBio={setBio} image={image} setImage={setImage} />
    </div>
  );
};

export default Dashboard;

