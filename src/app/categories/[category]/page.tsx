'use client';

import { useEffect, useState } from 'react';
import { listProductsByCategory } from '@/api/controllers/products';
 
 


interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: {
    _id: string;
    name: string;
  };
  status: string;
}



export default function CategoryProducts({ params }: { params: Promise<{ category: string }> }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { category } = await params;
        const { data, error } =  await listProductsByCategory(category);
        console.log(data);
        if (error) {
          setError(error);
        } else {
          setProducts(data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);


  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Products in Category</h1>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Estado de Carga
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <div className="h-48 bg-background/50 rounded-lg mb-4"></div>
                <div className="h-4 bg-background/50 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-background/50 rounded w-1/2"></div>
              </div>
            ))
          ) : (
            products.map((product) => (
              <div key={product._id} className="bg-gray-100 p-4 rounded-lg shadow-lg">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold text-primary mb-2">
                  {product.name}
                </h2>
                <div className="p-4 rounded-lg bg-white mb-4 shadow-sm min-h-[150px]">
                  <p className="text-primary/70 mb-4 leading-6 text-justify h-full">
                    {product.description}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">
                    ${product.price}
                  </span>
                  
                </div>
                <p className="text-primary">By {product.name}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {loading && (
        <div className="mt-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto">
            Loading...
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}