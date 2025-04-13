'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ProfileEditor from '@/app/dashboard/profile';
import MyArt from '@/app/dashboard/products/page';

const Dashboard = () => {
  const [bio, setBio] = useState('Welcome to your profile! This is your bio.');
  const [image, setImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'products'>('dashboard');
  const { user, signOut } = useAuth();
  const router = useRouter();
  const userId = '123';

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-[#0a5d5d] text-white p-4">
        <h1 className="hh-title hh-title-gray text-center handlewriting">Handcrafted Haven</h1>
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li
            className={`cursor-pointer py-2 ${activeTab === "dashboard" ? "text-black" : "hover:text-white"
              }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Overview
          </li>
          <li
            className={`cursor-pointer py-2 ${activeTab === "profile" ? "text-black" : "hover:text-white"
              }`}
            onClick={() => setActiveTab("profile")}
          >
            Edit Profile
          </li>
          <li className="py-2">
            <Link href="#" className="hover:text-blue-600" onClick={() => setActiveTab('products')}>My Art</Link>
          </li>
          <li className="py-2">
            <Link href="/" className="hover:text-blue-600" onClick={handleSignOut}>Sign Out</Link>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-8 bg-gray-50 flex justify-center">
        <div className="w-full">
          {activeTab === "dashboard" && (
            <>
              <h1 className="text-3xl font-bold mb-6 text-center">
                Welcome to Your Dashboard
              </h1>
              <section className="mb-8 bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Profile Summary
                </h2>
                {image && (
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 mx-auto relative">
                    <Image
                      src={image}
                      alt="Profile"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <p className="text-center">{bio}</p>
              </section>
            </>
          )}

          {activeTab === "profile" && (
            <ProfileEditor
              bio={bio}
              setBio={setBio}
              image={image}
              setImage={setImage}
              userId={userId}
            />
          )}

          {activeTab === 'products' && (<MyArt />)}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
