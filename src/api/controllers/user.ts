'use server';
// import { connect ToMongoDB } from '@/api/db';
// import { connect ToMongoDB } from '@/api/db';
//import connectDB from '@/api/config/db';
import { connectDB } from '@/api/db';
import { UserModel } from '@/api/models/user';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';


export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Nivel de complejidad del hash
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}



export async function listUsers() {

  try {
   // await connectT oMongoDB();
    await  connectDB();
    const users = JSON.parse(JSON.stringify( await UserModel.find()));
    return { data: users, error: null };

  } catch (error) {

          const errorMessage = error instanceof Error ? error.message : 'Error Unknown';
        return { data: [], error: errorMessage }; // Devuelve el error como string
        
  }
}










const UserFormSchema = z.object({
  
  id: z.string(),
   email: z.string().email({ message: 'Por favor ingresa un email válido.' }).trim(),
   password: z
    .string()
    .min(6, { message: 'The password must be at least 6 characters.' })           
    ,
});

// Use Zod to update the expected types
 
const CreateUserValidator = UserFormSchema.omit({ id: true});



 export type State = {
    errors?: {
       email?: string[];
       password?: string[]; 
    };
    message?: string | null;
  };
 


 type newUserType = {
       email: string;
     password:string; 
  
};

  
  export async function saveUserOnMongo(user: newUserType ) {

    try {
       // await connectTo MongoDB();
       //const users = JSON.parse(JSON.stringify( await UserModel.find()));
       await  connectDB();

         
        const newUser = new UserModel(user);
        await newUser.save();
        return newUser;
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw error;
    }
  }



  export async function createUserForm(prevState: State, formData: FormData) {
    // Validate form using Zod

    console.log('Enter createUser');


    console.log('formData.get(email):', formData.get('email'),  '   password:' ,  formData.get('password'));

    const validatedFields = CreateUserValidator.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),      
    });
   
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {


    console.log('!validatedFields.success');
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create User.',
      };
    }
   
    // Prepare data for insertion into the database
    const { email, password } = validatedFields.data;
    
    const hashedPassword = await hashPassword(password);

    console.log('email:',email, ' password:',password , ' encryptada:', hashedPassword);

    const parameter: newUserType = {
      email: email,
      password: hashedPassword,
    };
 

    const myAnswerCreateUser = await saveUserOnMongo(parameter);
    console.log('myAnswerCreateUser:',myAnswerCreateUser);

    

  if(myAnswerCreateUser) {       
      revalidatePath('/test/user');
     redirect('/test/user');
        
  }else{
       revalidatePath('/test/user/create');
      redirect('/test/user/create');
  }

  
  
    
  }




  