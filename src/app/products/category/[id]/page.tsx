'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import ClientLayout from '@/app/layout.client';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const ProductsByCategoryPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const [category, setCategory] = useState<{ name: string } | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const category = await axios.get(`/api/categories/${id}`);
        
        setCategory(category.data);

        const products = await axios.get(`/api/products/category/${id}`);

        setProducts(products.data);
      } catch (error) {
        setErrorMessage(`Error loading category datas: ${error}.`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (errorMessage) return <p className="text-center text-red-600">{errorMessage}</p>;

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-3">
        <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link className="hover:underline" href="/">Home</Link>
            </li>
            <li className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                className="lucide lucide-chevron-right w-4 h-4 text-gray-400">
                  <path d="m9 18 6-6-6-6"></path>
              </svg>
              <span className="hh-text-green-light">{category ? `Products from ${category.name}` : 'Unknow category'}</span>
            </li>
          </ol>
        </nav>
        <section className="py-8 px-4">
          <h1 className="text-3xl font-bold text-center hh-sub-title mb-6">
            {category ? `Products from ${category.name}` : 'Unknow category'}
          </h1>

          {products.length === 0 ? (
            <p className="text-center text-gray-500">No hay productos disponibles en esta categoría.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <div key={product._id} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                    height={100}
                    width={100}
                  />
                  <h2 className="text-lg font-semibold hh-sub-title">{product.name}</h2>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="mt-2 font-bold hh-price">US$ {product.price}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </ClientLayout>
  );
};

export default ProductsByCategoryPage;
