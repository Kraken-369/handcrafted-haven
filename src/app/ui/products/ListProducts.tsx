'use client';

import { useEffect, useState } from 'react';
import { listProducts } from '@/api/controllers/products';

interface productsInterface {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string;
  category: string;
  creator: string;
  status: string;
}

export default function ListProducts() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<productsInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    'Clothing & Accessories',
    'Jewelry',
    'Home Decor',
    'Personal Care',
    'Food & Beverages',
    'Stationery & Paper Goods',
    'Toys & Games',
    'Artwork & Prints',
    'Leather Goods',
    'Miscellaneous Handmade Item',
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await listProducts();
        if (error) {
          setError(error);
        } else {
          setProducts(data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
      

        {/* Category Filter */}
        <div className="mb-8">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading state
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <div className="h-48 bg-background/50 rounded-lg mb-4"></div>
                <div className="h-4 bg-background/50 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-background/50 rounded w-1/2"></div>
              </div>
            ))
          ) : (
            filteredProducts.map((product) => (

              
              <div key={product._id} className="bg-gray-100 p-4 rounded-lg shadow-lg ">
           {/* 
                <img
                  src={product.images}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                */}
                <h2 className="text-xl font-semibold text-primary mb-2">
                  {product.name}
                </h2>
          {/*"text-primary/70 mb-4   leading-6 text-justify min-h-[5rem]"*/}
                <div className="p-4 rounded-lg bg-white mb-4 shadow-sm min-h-[150px]">
                <p className= "text-primary/70 mb-4 leading-6 text-justify h-full">
                   {product.description}
                   </p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">
                    ${product.price}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.status === 'Available'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.status}
                  </span>
                </div>                
                <p className="text-primary">By {product.creator}</p>

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
