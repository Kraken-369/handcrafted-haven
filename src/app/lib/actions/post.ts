'use server';


import {PostSchema} from '@/app/models/postModel';
 
import { connectToMongoDB } from '@/app/lib/db';

export default async function listPostAction(){
    try{

        await connectToMongoDB();
        
        const posts = JSON.parse(JSON.stringify( await PostSchema.find()));
        
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