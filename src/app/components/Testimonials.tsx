'use client';

import Image from 'next/image';

const testimonials = [
  {
    name: 'Emily R.',
    message: 'Absolutely stunning craftsmanship! I love supporting local artisans.',
    avatar: 'https://i.pravatar.cc/150?img=27'
  },
  {
    name: 'Carlos M.',
    message: 'The quality exceeded my expectations. Unique and sustainable products!',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    name: 'Alan K.',
    message: 'Shopping here feels personal. I love reading the artisan stories.',
    avatar: 'https://i.pravatar.cc/150?img=14'
  }
];

export default function Testimonials() {
  return (
    <section className="w-full py-12 px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="border rounded-2xl p-6 shadow-lg bg-white flex flex-col items-center text-center"
          >
            <Image
              src={t.avatar}
              alt={t.name}
              width={80}
              height={80}
              className="rounded-full mb-4 object-cover"
            />
            <p className="italic text-gray-700 mb-4">&quot;{t.message}&quot;</p>
            <p className="font-semibold text-green-dark">– {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
