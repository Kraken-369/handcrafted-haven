'use server';

import { connectDB } from '@/api/db';
// import connectDB from '@/api/config/db';
import {PostModel} from '@/api/models/postModel';
 
  

export default async function listPostAction(){
    try{

        // await connect To MongoDB();
        await connectDB();       
        const posts = JSON.parse(JSON.stringify( await PostModel.find()));
        
    //         console.log('post action data: ',data );
    //     console.log('user action data: ',users );    
    // console.log(`users=${users}`); // 
    // console.log(`JSON.parse users=${JSON.parse(JSON.stringify(users))}`); // 

        return { data: posts, error: null };
        
    }catch(error){

        const errorMessage = error instanceof Error ? error.message : 'Error Unknown';
        return { data: [], error: errorMessage }; // Devuelve el error como string
 
    }


}