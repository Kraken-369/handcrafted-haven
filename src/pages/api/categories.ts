import { createCategory, getAllCategories } from "@/api/controllers/category";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return createCategory(req, res);
  }
  if (req.method === 'GET') {
    return getAllCategories(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}