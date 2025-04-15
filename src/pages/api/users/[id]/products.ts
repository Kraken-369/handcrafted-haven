import { newProduct } from "@/api/controllers/products";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return await newProduct(req, res);
  }
  
  return res.status(405).json({ error: 'Method not allowed.' });
}