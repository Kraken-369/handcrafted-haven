import { createContact } from '@/api/controllers/contact';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') 
    return await createContact(req, res);
  return res.status(405).json({ message: 'Method Not Allowed' });
}
