//import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '@/app/lib/db';
import { getUserModel } from '@/app/models/getUserModel';



export async function listUsers() {
  try {
    await connectToMongoDB();

    const UserModel = await getUserModel();
    
    console.log(`listUsers moduel, UserModel=${UserModel}`); // 
    
    const users = await UserModel.find().exec();


    return { data: users, error: null };;
  } catch (error) {

        return { data: [], error: `Error getting user data, error:${error}` };
  }
}