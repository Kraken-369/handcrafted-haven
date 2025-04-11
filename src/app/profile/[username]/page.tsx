import { notFound } from "next/navigation";
import profiles from "@/data/profiles.json";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
};

type profile = {
  username: string;
  name: string;
  bio: string;
  image: string;
  products: Product[];
};

type Props = {
  params: { username: string };
};

export async function generateStaticParams() {
  return profiles.map((profile) => ({
    username: profile.username,
  }));
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;

  const profile = profiles.find((p) => p.username === username);
  if (!profile) return notFound();

  return (
    <div className="p-6">
      <div className="flex flex-col items-center text-center mb-8">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-32 h-32 rounded-full object-cover"
        />
        <h1 className="text-2xl font-bold mt-4">{profile.name}</h1>
        <p className="text-gray-600 mt-2">{profile.bio}</p>
      </div>
      <h2 className="text-xl font-semibold mt-6 mb-2 text-center">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {profile.products.map((product) => (
          <div key={product._id} className="border p-4 rounded-md shadow">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="font-medium text-lg mt-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
            <p className="mt-2 font-semibold">${product.price}</p>
            <p className="text-sm text-gray-500">In stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

