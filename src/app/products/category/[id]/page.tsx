'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const ProductsByCategoryPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const [category, setCategory] = useState<{ name: string } | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const category = await axios.get(`/api/categories/${id}`);
        
        setCategory(category.data);

        const products = await axios.get(`/api/products/category/${id}`);

        setProducts(products.data);
      } catch (error) {
        setErrorMessage(`Error loading category datas: ${error}.`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (errorMessage) return <p className="text-center text-red-600">{errorMessage}</p>;

  return (
    <section className="py-8 px-4">
      <h1 className="text-3xl font-bold text-center hh-sub-title mb-6">
        {category ? `Products from ${category.name}` : 'Unknow category'}
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos disponibles en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product._id} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
                height={100}
                width={100}
              />
              <h2 className="text-lg font-semibold hh-sub-title">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="mt-2 font-bold hh-price">US$ {product.price}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsByCategoryPage;
