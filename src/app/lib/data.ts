// data-access.ts
import { getUserModel ,UserDocument  , UserUpdate } from '../models/user';

const User = getUserModel();
 
export async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await User.findOne({ _id: userId });
    return user;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
}

export async function createUser(user: Omit<UserDocument, '_id'>) {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
}

export async function updateUser(userId: string, updates: UserUpdate) {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
}

export async function deleteUser(userId: string) {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
}