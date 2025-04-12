'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserProfile from '@/app/components/UserProfile';
import ProductList from '@/app/components/ProductList';

interface Props {
  id: string;
}

interface User {
  name: string;
  bio: string;
  profileImage: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export default function PublicProfileClient({ id }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching user with ID:', id);

        const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`);
        const productRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${id}`);

        if (!userRes.ok || !productRes.ok) {
          setError(true);
          return;
        }

        const userData: User = await userRes.json();
        const productData: Product[] = await productRes.json();

        setUser(userData);
        setProducts(productData);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(true);
      }
    };

    fetchData();
  }, [id]);

  if (error) return notFound();
  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{user.name}&#39;s Public Profile</h1>
      <UserProfile user={user} />
      <h2 className="text-2xl font-semibold mb-2">Featured Products</h2>
      <ProductList products={products} />
    </div>
  );
}

