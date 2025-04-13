'use client';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserProfile from '@/app/components/UserProfile';
import ProductList from '@/app/components/ProductList';
import { useParams } from 'next/navigation';
import ClientLayout from '@/app/layout.client';

const PublicProfilePage = () => {
  const params = useParams();
  const id = params?.id as string;
  console.log('Extracted ID from params:', id);


  type User = {
    _id: string;
    name: string;
    email: string;
    bio?: string;
    profileImage?: string;
    featuredProducts?: string[];
  };

  type PublicProduct = {
    _id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
    category?: string;
  };

  type Product = {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };


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
        const productData: PublicProduct[] = await productRes.json(); 
        console.log('Fetched Product Data:', productData);


        const mappedProducts: Product[] = productData.map((p: PublicProduct) => ({
          id: p._id,
          name: p.name,
          price: p.price,
          imageUrl: p.image || "", 
        }));

        setUser(userData);
        setProducts(mappedProducts); 
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
    <ClientLayout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{user.name}&#39;s Public Profile</h1>
        <UserProfile user={user} />
        <h2 className="text-2xl font-semibold mb-2">Featured Products</h2>
        <ProductList products={products} /> 
      </div>
    </ClientLayout>
  );
};

export default PublicProfilePage;
