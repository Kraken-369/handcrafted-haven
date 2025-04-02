import Purchase from '@/api//models/purchase';
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "@/api/config/db"; 
await connectDB();

export const createPurchase = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, products, totalAmount } = req.body;
    
    const newPurchase = new Purchase({
      userId,
      products,
      totalAmount,
    });
    console.log(newPurchase);

    await newPurchase.save();

    return res.status(201).json({ message: 'Purchase success.', purchase: newPurchase });
  } catch (error) {
    return res.status(500).json({ message: `Purchase unsuccessful. ERROR: ${error}` });
  }
};

export const getAllPurchases = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(404).json({ message: 'Resource not implemented yet.'});
}
