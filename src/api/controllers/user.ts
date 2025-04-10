import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import connectDB from '@/api/config/db';
import User from '@/api/models/user';

await connectDB();

export const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'artisan',
    });

    await newUser.save();

    return res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};