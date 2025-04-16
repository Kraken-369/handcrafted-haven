'use client';

import ListProducts from '../ui/products/ListProducts';
import ClientLayout from '../layout.client';

export default function Products() {
  return (
    <ClientLayout>
      <div className="container mx-auto ">
        <h1 className="text-3xl text-center pt-2 font-bold text-primary mb-8">
          Our Products Page
        </h1>
        <ListProducts />
      </div>
    </ClientLayout>
  );
}
