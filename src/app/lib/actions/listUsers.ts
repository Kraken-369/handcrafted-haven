import { NextApiRequest, NextApiResponse } from 'next';
import { getUserModel } from '@/app/models/user';

export async function listUsers() {
  try {
    const UserModel = await getUserModel();
    const users = await UserModel.find().exec();
    return users;
  } catch (error) {
    throw new Error('Error al obtener los usuarios');
  }
}