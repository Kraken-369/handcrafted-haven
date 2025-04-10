'use client';

import { useEffect, useState } from 'react';
import { listProducts } from '@/api/controllers/products';
// import { mockProducts } from './mockData'; 

type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
};

const Deals = () => {
  const [deals, setDeals] = useState<ProductType[]>([]);

  useEffect(() => {
    async function fetchDeals() {
      
      const { data } = await listProducts();
     // let data: ProductType[] = [];
      //data = mockProducts;
      if (data.length > 0) {
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);
        setDeals(selected);
      }
    }
    fetchDeals();
  }, []);

  return (
    <section className="w-full py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 hh-title">🔥 Deals of the Day</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((product) => (
          <div key={product._id} className="border rounded-2xl shadow-lg overflow-hidden">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-bold text-lg">
                  ${(product.price * 0.8).toFixed(2)}
                </span>
                <span className="line-through text-gray-400">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Deals;
