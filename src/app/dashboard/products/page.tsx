'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import axios from 'axios';

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
};

const MyArt = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProducts = async () => {
      if (!user) return <p className="text-gray-500">The user is not authenticated.</p>;

      try {
        const res = await axios.get(`/api/products/user/${user.id}`);

        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProducts();
  }, [user]);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!products.length) return <p className="text-gray-500">You have not yet registered any products.</p>;

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
        {products.map((product) => (
          // <div key={product._id} className="bg-white shadow p-4 rounded-2xl">
          <div key={product._id} className="rounded overflow-hidden shadow-lg">
            <div className="relative h-36 w-full">
              {product.imageUrl && (
                <Image src={product.imageUrl} alt={product.name} className="object-cover" fill sizes="(max-width: 100%)" />
              )}
            </div>
            <div className="p-2">
              <h3 className="hh-sub-title handwriting">{product.name}</h3>
              <p className="border-t hh-border-gray p-1">{product.description}</p>
              <p className="text-gray-700">Precio: <span className="hh-text-green-light font-bold">$ {product.price}</span></p>
              <span
                className={`inline-block mt-2 px-2 py-1 text-sm rounded ${
                  product.stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {product.stock ? 'Disponible' : 'No disponible'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyArt;