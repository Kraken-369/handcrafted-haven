'use client';

import { useEffect, useState, useContext } from 'react';
import {
  listProducts,
  listProductsByCategory,
} from '@/api/controllers/products';
import { useCategories } from '@/app/ui/category/useCategories';
import { CartContext } from '@/context/CartContext';
/*
 {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  name: string;
  status: string;
}
*/
import Image from 'next/image';

interface productsInterface {
  _id: string;
  name: string;
  description: string;
  price: string;
  stock: string;
  imageUrl: string;
  categoryId: {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
  };
  artisanId: string;
}

export default function ListProducts() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<productsInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { categories } = useCategories();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        if (selectedCategory === 'all') {
          const { data, error } = await listProducts();
          if (error) {
            setError(error);
          } else {
            setProducts(data);
          }
        } else {
          const { data, error } = await listProductsByCategory(
            selectedCategory
          );
          if (error) {
            setError(error);
          } else {
            setProducts(data);
          }
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleAddToCart = (product: productsInterface) => {
    // Retrieve existing cart items from local storage or initialize an empty array
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

    // Check if the product is already in the cart
    const productExists = cartItems.some(
      (item: productsInterface) => item._id === product._id
    );

    // If the product doesn't exist in the cart, add it
    if (!productExists) {
      cartItems.push(product);
    }

    // Update local storage with the new cart items
    localStorage.setItem('cart', JSON.stringify(cartItems));

    const cartContext = useContext(CartContext);
    cartContext?.refreshCart();
    console.log('Product added to cart:', product.name);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? // Loading state
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <div className="h-48 bg-background/50 rounded-lg mb-4"></div>
                  <div className="h-4 bg-background/50 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-background/50 rounded w-1/2"></div>
                </div>
              ))
            : products.map((product) => (
                <div
                  key={product._id}
                  className="bg-gray-100 p-4 rounded-lg shadow-lg"
                >
                  <div className="relative h-36 w-full">
                    {
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        className="object-cover rounded"
                        fill
                        sizes="(max-width: 100%)"
                      />
                    }
                  </div>
                  <h2 className="text-xl font-semibold text-primary mb-2">
                    {product.name}
                  </h2>
                  {/*"text-primary/70 mb-4   leading-6 text-justify min-h-[5rem]"*/}
                  <div className="p-4 rounded-lg bg-white mb-4 shadow-sm min-h-[150px]">
                    <p className="text-primary/70 mb-4 leading-6 text-justify h-full">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">
                      ${product.price}
                    </span>
                  </div>
                  <p className="text-primary">By {product.name}</p>
                  {/* with this button I will save this item to the local storage and update the cart */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 px-4 py-2 bg-green-dark text-black rounded-lg hover:bg-green-light/80 transition duration-200"
                  >
                    Add To Cart
                  </button>
                </div>
              ))}
        </div>
      </div>

      {loading && (
        <div className="mt-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto">
            Loading...
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}
