'use server';
//import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '@/app/lib/db';
// import { getUserModel } from '@/app/models/getUserModel';
import { UserModel } from '@/app/models/user';


export async function listUsers() {
  try {
    await connectToMongoDB();

    // const UserModel = await getUserModel();
    
   // console.log(`listUsers moduel, UserModel=${UserModel}`); // 
    
    const users = await UserModel.find().lean();
    console.log(`users=${users}`); // 
    console.log(`JSON.parse users=${JSON.parse(JSON.stringify(users))}`); // 

    return { data: users, error: null };;
  } catch (error) {

        return { data: [], error: `Error getting user data, error:${error}` };
  }
}