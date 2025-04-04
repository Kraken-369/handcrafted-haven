'use server';
import connectDB from '@/api/config/db';
import { ProductsModel } from '@/api/models/productsModel';

export async function listProducts() {

  try { 
    await  connectDB();
    const users = JSON.parse(JSON.stringify( await ProductsModel.find()));
    return { data: users, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error Unknown';
    return { data: [], error: errorMessage }; // Devuelve el error como string
        
  }
}


export type newProductsType = {
  name: string ;
  description: string;
  price:  number;
  images: string;
  category:  string;
  creator:  string;
  status:   string;
};

 


export async function saveProductsOnMongo(products:newProductsType) {

  try {
    console.log(`saveProductsOnMongo:Recibi:${products.name}`);
     await  connectDB();     
       
     const newProduct = new ProductsModel(products);
     await newProduct.save();
     return newProduct;

     
  } catch (error) {
    console.error('Error while create a new product:', error);
    throw error;
  }
}
