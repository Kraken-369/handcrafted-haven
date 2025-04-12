'use client';

import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { FaFacebook, FaPinterest, FaInstagram, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
  _id: string;
  name: string;
  imageUrl: string;
}

const Footer = () => {
  const year = new Date().getFullYear();
  const [categoriesColumnOne, setCategoriesColOne] = useState<Category[]>([]);
  const [categoriesColumnTwo, setCategoriesColTwo] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');

        setCategoriesColOne(response.data.slice(0, 3));
        setCategoriesColTwo(response.data.slice(3, 6));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="bg-white border-t text-sm text-gray-700">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold handwriting">Handcrafted Haven</h2>
          <div className="flex items-start gap-2">
            <MapPinIcon className="w-4 h-4 mt-1" />
            <span>2357 Gordon Street, CA</span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4" />
            <span>0123 456 789</span>
          </div>
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="w-4 h-4" />
            <span>contact@handcrafted-haven.com</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Artisan or Customer</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="/login">Sign In</a></li>
            <li><a href="#">Sign Up</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-gray-600">
            {categoriesColumnOne.map(category => (
              <li key={category._id}>
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">&nbsp;</h3>
          <ul className="space-y-2 text-gray-600">
            {categoriesColumnTwo.map(category => (
              <li key={category._id}>
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Social Media</h3>
          <div className="flex gap-4 text-gray-700">
            <FaFacebook className="w-5 h-5 hover:text-black cursor-pointer" />
            <FaPinterest className="w-5 h-5 hover:text-black cursor-pointer" />
            <FaInstagram className="w-5 h-5 hover:text-black cursor-pointer" />
            <FaYoutube className="w-5 h-5 hover:text-black cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="border-t hh-border-gray mt-8 py-4 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-gray-500">
          <p>Copyright © {year} <span className="handwriting">Handcrafted Haven</span>. All Rights Reserved.</p>
          <div className="flex gap-2">
            <Image src="/payment-methods.png" alt="Payment Methods" width={250} height={24} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
