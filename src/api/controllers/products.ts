'use server';

import connectDB from '@/api/config/db';
import { ProductsModel } from '@/api/models/productsModel';
import Product from '@/api/models/product';
import Category from '@/api/models/category';
import User from '@/api/models/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

await connectDB();

export async function listProducts() {

  try {
    const products = await ProductsModel.find()
      .populate('categoryId');

    const mydata = JSON.parse(JSON.stringify(products));

    return { data: mydata, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error Unknown';
    return { data: [], error: errorMessage };

  }
}

export type newProductsType = {
  name: string;
  description: string;
  price: number;
  images: string;
  categoryId: string;
  artisanId: string;
  status: string;
};

export async function saveProductsOnMongo(products: newProductsType) {

  try {
    const newProduct = new ProductsModel(products);
    await newProduct.save();
    return newProduct;


  } catch (error) {
    console.error('Error while create a new product:', error);
    throw error;
  }
}

export const getProductsByCategoryId = async (req: NextApiRequest, res: NextApiResponse) => {
  void Category;
  const { id } = req.query;
  const categoryId = Array.isArray(id) ? id[0] : id;

  if (!categoryId) {
    return res.status(400).json({ message: 'Category ID is required.' });
  }

  try {
    const products = await Product.find({ categoryId: ObjectId.createFromHexString(categoryId) }).populate('categoryId', 'name');

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
}

export const fetchProductsByCategoryId = async (categoryId: string) => {
  const response = await fetch(`/api/categories/${categoryId}`);
  const data = await response.json();
  return data;
};

export async function listProductsByCategory(categoryId: string) {

  try {
    await connectDB();

    const products = await ProductsModel.find({ categoryId: ObjectId.createFromHexString(categoryId) })
      .populate({ path: 'categoryId', strictPopulate: false })
      .populate({ path: 'userId', strictPopulate: false });

    const mydata = JSON.parse(JSON.stringify(products));

    return { data: mydata, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error Unknown';
    return { data: [], error: errorMessage }; // Devuelve el error como string

  }
}

export const getProductsByUserId = async (req: NextApiRequest, res: NextApiResponse) => {
  void User;
  const { id } = req.query;
  const userId = Array.isArray(id) ? id[0] : id;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  if (!ObjectId.isValid(userId)) {
    return res.status(500).json({ message: 'Invalid user ID.' });
  }

  try {
    const products = await Product.find({ artisanId: ObjectId.createFromHexString(userId) }).populate('categoryId');

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
}

export const newProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description, price, stock, imageUrl, categoryId, artisanId } = req.body;
  const artisanIdObject = ObjectId.createFromHexString(Array.isArray(artisanId) ? artisanId[0] : artisanId);
  const categoryIdObject = ObjectId.createFromHexString(Array.isArray(categoryId) ? categoryId[0] : categoryId);

  if (!ObjectId.isValid(artisanIdObject) && !ObjectId.isValid(categoryIdObject)) {
    return res.status(500).json({ message: 'Invalid User ID or Category ID provided.' });
  }

  if (!name || !price || !imageUrl) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const newProduct = new Product({
    name,
    description,
    price,
    stock,
    imageUrl,
    categoryId,
    artisanId
  });

  try {
    await newProduct.save()

    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: `Error creating product: ${error}` });
  }
}
