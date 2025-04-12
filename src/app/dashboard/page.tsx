"use client";
import React, { useState } from "react";
import ProfileEditor from "./profile";

const Dashboard = () => {
  const [bio, setBio] = useState("Welcome to your profile! This is your bio.");
  const [image, setImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "profile" | "products"
  >("dashboard");
  
  const userId = "abc123";
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-[#0a5d5d] text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li
            className={`cursor-pointer py-2 ${
              activeTab === "dashboard" ? "text-black" : "hover:text-white"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Overview
          </li>
          <li
            className={`cursor-pointer py-2 ${
              activeTab === "profile" ? "text-black" : "hover:text-white"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Edit Profile
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-8 bg-gray-50 flex justify-center">
        <div className="w-full max-w-2xl">
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
                  <img
                    src={image}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mb-4 mx-auto"
                  />
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
