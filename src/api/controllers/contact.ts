
'use server';

import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/api/config/db';
import Contact from '@/api/models/contact';

export const createContact = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    await connectDB();
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    return res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};