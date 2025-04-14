'use client';

import ClientLayout from '@/app/layout.client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const teamMembers = [
  { name: 'Sariha Selise Hope Shepherd', role: 'Front-End Developer' },
  { name: 'Amauri Ferreira Siqueira', role: 'Backend Developer' },
  { name: 'Nestor Ramiro Otondo Rios', role: 'Backend Developer' },
  { name: 'Ivan Josue Romero Bobadilla', role: 'Front-End Developer' },
  { name: 'Pedro Rafael Zelada Soruco', role: 'Front-End Developer' },
];


export default function About() {
    return (
      <ClientLayout>
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="container mx-auto px-4 py-10">
    
      <section className="w-full py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold handwriting mb-6">
            About Handcrafted Haven
          </h1>

          <div className="flex justify-center mb-6">
            <Image
              src="https://cdn.pixabay.com/photo/2022/06/08/15/23/ceramics-7250708_1280.jpg"
              alt="Handcrafted Items"
              width={800}
              height={400}
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>

          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            Connecting passionate artisans with conscious consumers through a community-driven, sustainable marketplace.
          </p>
        </section>

        <hr className="my-10" />

          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            Empower artisans by offering them a platform to thrive, connect customers with unique handmade goods, and foster a culture of mindful consumption.
          </p>

        <hr className="my-10" />

          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
              <span className="text-5xl mb-4">🌱</span>
              <h3 className="text-2xl font-semibold mb-2">Sustainability</h3>
              <p className="text-base leading-relaxed">
                We believe in protecting our planet by promoting eco-friendly materials and practices.
              </p>
            </div>
            <div className="border rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
              <span className="text-5xl mb-4">🤝</span>
              <h3 className="text-2xl font-semibold mb-2">Community</h3>
              <p className="text-base leading-relaxed">
                We foster a supportive environment where artisans and customers build genuine connections.
              </p>
            </div>
            <div className="border rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
              <span className="text-5xl mb-4">🎨</span>
              <h3 className="text-2xl font-semibold mb-2">Creativity</h3>
              <p className="text-base leading-relaxed">
                We celebrate the uniqueness and craftsmanship behind every handmade item.
              </p>
            </div>
          </div>
    

        <hr className="my-10" />
          <h2 className="text-3xl font-bold mb-6">Meet the Team</h2>
          <ul className="space-y-4 text-lg">
            {teamMembers.map((member) => (
              <li key={member.name} className="flex flex-col md:flex-row md:items-center md:justify-between pb-2">
                <span>{member.name}</span>
                {/* <span className="text-gray-500">{member.role}</span> */}

              </li>
            ))}
          </ul>
       </motion.section>
    </ClientLayout>
    );
  }
  