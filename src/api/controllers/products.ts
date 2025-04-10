'use server';

import connectDB from '@/api/config/db';
import '@/api/models/user'; 
import { ProductsModel } from '@/api/models/productsModel';

import Product from '@/api/models/product';
import Category from '../models/category';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';


export async function listProducts() {

  try { 
    await  connectDB();
    //console.log('antes listar');

    const products = await ProductsModel.find()
    .populate('categoryId')
    .populate('artisanId');

    const mydata = JSON.parse(JSON.stringify( products ));
    // console.log(mydata);

    return { data: mydata, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error Unknown';
    return { data: [], error: errorMessage }; // Devuelve el error como string
        
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

 


export async function saveProductsOnMongo(products:newProductsType) {

  try {
    console.log(`saveProductsOnMongo:Recibi:${products.name}`);
     await  connectDB();     
       
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

  await connectDB();

  try {
    const products = await Product.find({ categoryId: ObjectId.createFromHexString(categoryId) }).populate('categoryId', 'name');

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
}

// api/client.ts
export const fetchProductsByCategoryId = async (categoryId: string) => {
  const response = await fetch(`/api/categories/${categoryId}`);
  const data = await response.json();
  return data;
};


export async function listProductsByCategory(categoryId: string) {

  try { 
    await  connectDB();
    //console.log('antes listar');
    
    const products = await ProductsModel.find({ categoryId: ObjectId.createFromHexString(categoryId) })
    .populate('categoryId')
    .populate('artisanId');

    const mydata = JSON.parse(JSON.stringify( products ));
    // console.log(mydata);

    return { data: mydata, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error Unknown';
    return { data: [], error: errorMessage }; // Devuelve el error como string
        
  }
}
