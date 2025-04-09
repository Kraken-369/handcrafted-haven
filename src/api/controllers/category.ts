import Category from '@/api/models/category';
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/api/config/db';
import { ObjectId } from 'mongodb';

await connectDB();

export const createCategory =  async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, description, imageUrl } = req.body;
    
    if (!name || !imageUrl) {
      return res.status(400).json({ message: 'Name and imageUrl are required.' });
    }

    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists.' });
    }

    const newCategory = new Category({ name, description, imageUrl });
    
    await newCategory.save();
    
    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ message: `Error creating category: ${error}` });
  }
}

export const getAllCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const categories = await Category.find();
    
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
}

export const getCategoryById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const categoryId = Array.isArray(id) ? id[0] : id;

  if (!categoryId) {
    return res.status(400).json({ message: 'Category ID is required.' });
  }

  if (!ObjectId.isValid(categoryId)) {
    return res.status(400).json({ message: 'Invalid category ID format.'});
  }

  try {
    const category = await Category.findById(categoryId);

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
}