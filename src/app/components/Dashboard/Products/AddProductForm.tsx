'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { ErrorMessage } from '@/app/components/ErrorMessage';
import { NewProduct, Product } from '@/types/Product';

type Category = {
  _id: string;
  name: string;
};

type AddProductFormProps = {
  onProductAdded: (product: Product) => void;
};

const AddProductForm = ({ onProductAdded }: AddProductFormProps) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState<NewProduct>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    stock: 1,
    categoryId: '',
    artisanId: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoryList = await axios.get('/api/categories');
        setCategories(categoryList.data);
      } catch (error) {
        setError(`Error al obtener categorías: ${error}`);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (user?.id) {
      setFormData((prev) => ({ ...prev, artisanId: user.id }));
    }
  }, [user]);

  if (!user || user.role !== 'artisan') {
    return <p>Only artisan users can add products.</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      const response = await axios.post(`/api/users/${user.id}/products`, payload);

      setMessage('Product added successfully');
      setFormData({
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        stock: 1,
        categoryId: '',
        artisanId: user.id,
      });
      onProductAdded(response.data);
    } catch (error) {
      setError(`Error adding product: ${error}`);
    }
  };

  return (
    <div className="mx-auto mt-6 p-4 border border-gray-300 rounded-xl shadow hh-bg-form">
      <h2 className="text-xl font-bold mb-4">Adding new product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between items-center mt-4">
          <label
            className="flex-1 mb-3 mt-4 block text-xs text-gray-900"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="flex-5 p-2 border border-gray-200 rounded focus:outline-none"
            required
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <label
              className="flex-1 mb-3 mt-4 block text-xs text-gray-900"
              htmlFor="description"
            >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="flex-5 p-2 border border-gray-200 rounded focus:outline-none"
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <label
              className="flex-1 mb-3 mt-4 block text-xs text-gray-900"
              htmlFor="price"
            >
            Price:
          </label>
          <input
            id="price"
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="flex-5 w-full p-2 border border-gray-200 rounded focus:outline-none"
            required
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <label
              className="flex-1 mb-3 mt-4 block text-xs text-gray-900"
              htmlFor="imageUrl"
            >
            Image URL:
          </label>
          <input
            id="imageUrl"
            type="text"
            name="imageUrl"
            placeholder="Image [URL]"
            value={formData.imageUrl}
            onChange={handleChange}
            className="flex-5 p-2 border border-gray-200 rounded focus:outline-none"
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <label
              className="flex-1 mb-3 mt-4 block text-xs text-gray-900"
              htmlFor="category"
            >
            Category:
          </label>
          <select
            id="category"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="flex-5 p-2 border border-gray-200 rounded focus:outline-none"
            required
          >
            <option value="">Choose a category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800"
        > 
          Add Product
        </button>
      </form>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default AddProductForm;
