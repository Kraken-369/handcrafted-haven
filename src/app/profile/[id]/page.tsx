import { notFound } from 'next/navigation';
import UserProfile from '../../components/UserProfile';
import ProductList from '../../components/ProductList'; 


interface PublicProfilePageProps {
  params: { id: string };
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { id } = params;

  const userRes = await fetch(`${process.env.API_URL}/api/users/${id}`);
  const productRes = await fetch(`${process.env.API_URL}/api/products/category/${id}`);

  if (!userRes.ok || !productRes.ok) {
    return notFound();
  }

  const user = await userRes.json();
  const products = await productRes.json();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{user.name}&#39;s Public Profile</h1>
      <UserProfile user={user} />
      <h2 className="text-2xl font-semibold mb-2">Featured Products</h2>
      <ProductList products={products} />
    </div>
  );
}
