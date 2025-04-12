import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
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

export const getAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await User.find().select('-password');
    
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

export const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const userId = Array.isArray(id) ? id[0] : id;

  if (!userId) {
    return res.status(400).json({ message: 'Category ID is required.' });
  }

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid category ID format.'});
  }

  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
}

export const updateUserById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const userId = Array.isArray(id) ? id[0] : id;

  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!userId || !ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const { bio, profileImage, featuredProducts } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(bio !== undefined && { bio }),
        ...(profileImage !== undefined && { profileImage }),
        ...(featuredProducts !== undefined && { featuredProducts }),
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: `Failed to update user: ${error}` });
  }
};
