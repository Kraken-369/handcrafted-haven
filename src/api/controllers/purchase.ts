import Purchase from '@/api//models/purchase';
import '@/api/models/user';
import '@/api/models/productsModel'
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/api/config/db'; 

await connectDB();

export const createPurchase = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, products, totalAmount } = req.body;
    
    const newPurchase = new Purchase({
      userId,
      products,
      totalAmount,
    });

    await newPurchase.save();

    return res.status(201).json({ message: 'Purchase success.', purchase: newPurchase });
  } catch (error) {
    return res.status(500).json({ message: `Purchase unsuccessful. ERROR: ${error}.` });
  }
};

export const getAllPurchases = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const purchases = await Purchase.find()
      .populate('userId', 'email')
      .populate('products.productId', 'name price');

    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}.` });
  }
}
