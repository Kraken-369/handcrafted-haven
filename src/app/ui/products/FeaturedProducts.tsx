'use client';

import { useEffect, useRef, useState } from 'react';
import { listProducts } from '@/api/controllers/products';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProductType {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      const { data } = await listProducts();
      const shuffled = data.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 8);
      setProducts(selected);
    };
    fetchRandomProducts();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.5; 
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full py-8 px-4 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">✨ Featured Products</h2>
      </div>

      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md hover:scale-105 transition-transform"
        >
          ←
        </button>

        {/* Product container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              className="min-w-[200px] bg-white p-4 rounded-lg shadow-sm flex-shrink-0 snap-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative w-full h-36 mb-3">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-primary">{product.name}</span>
                <span className="text-gray-600 text-sm">${product.price}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md hover:scale-105 transition-transform"
        >
          →
        </button>
      </div>
    </section>
  );
}