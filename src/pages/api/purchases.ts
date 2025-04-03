import { createPurchase, getAllPurchases } from '@/api/controllers/purchase';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return createPurchase(req, res);
  } else if (req.method === 'GET') {
    return getAllPurchases(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed.' });
  }
}
