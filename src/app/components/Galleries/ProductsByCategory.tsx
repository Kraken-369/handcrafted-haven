'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

interface Category {
  _id: string;
  name: string;
  imageUrl: string;
}

export default function ProductsByCategory() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');

        setCategories(response.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="w-full py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center hh-title">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map(category => (
          <Link
            key={category._id}
            href={`/products/category/${category._id}`}
            className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-36 w-full">
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-2 text-center hh-name-category font-medium">
              {category.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
