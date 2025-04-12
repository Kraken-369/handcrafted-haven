import { getAllUsers, registerUser } from "@/api/controllers/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return await getAllUsers(req, res);
  }
  if (req.method === 'POST') {
    return await registerUser(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}