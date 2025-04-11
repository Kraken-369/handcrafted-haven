import { loginUser } from '@/api/controllers/login';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return loginUser(req, res);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
