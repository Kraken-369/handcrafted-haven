import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/api/config/db';
import { getAllProducts, createProduct } from '@/api/controllers/product';

export default async function handlerProduct(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  
  if (req.method === 'GET') {
    try {
      const products = await getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Error fetching products' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, price, stock, imageUrl } = req.body;
      const newProduct = await createProduct({ name, description, price, stock, imageUrl });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Error creating product' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
