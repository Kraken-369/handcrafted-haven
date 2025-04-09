import { getCategoryById } from "@/api/controllers/category";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return await getCategoryById(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}