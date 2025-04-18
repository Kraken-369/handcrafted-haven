'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

type Product = {
  artisanId: string;
  categoryId: {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
  };
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  _id: string;
};

function Form() {
  const { user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user?.name || '');
  const [customerID, setCustomerID] = useState(user?.id || '');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedProducts = JSON.parse(storedCart);
      // Transform the products to match the Purchase model
      const transformedProducts = parsedProducts.map((product: Product) => ({
        productId: product._id,
        quantity: product.stock || 1,
        price: product.price,
      }));

      // Calculate total based on each product's price.
      const calculatedTotal = transformedProducts.reduce(
        (acc: number, product: { price: number; quantity: number }) =>
          acc + product.price * product.quantity,
        0
      );

      const purchaseData = {
        userId: user?.id,
        products: transformedProducts,
        totalAmount: calculatedTotal,
      };

      const response = await fetch('/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
      });

      if (response.ok) {
        localStorage.removeItem('cart');
        router.push('/');
      } else {
        console.error('Purchase failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4">
      <div className="mb-4">
        {/* Customer Name */}
        <label htmlFor="customer">Customer Name</label>
        <input
          type="text"
          id="customer"
          name="customer"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
          className="border border-gray-300 rounded p-2"
        />
      </div>
      <div>
        <label htmlFor="customerID" hidden>
          Customer ID
        </label>
        <input
          type="text"
          id="customerID"
          name="customerID"
          hidden
          value={customerID}
          onChange={(e) => {
            setCustomerID(e.target.value);
          }}
          className="border border-gray-300 rounded p-2"
        />
      </div>

      <button type="submit" className="bg-black text-white rounded p-2 mt-4">
        Buy
      </button>
    </form>
  );
}

export default Form;
