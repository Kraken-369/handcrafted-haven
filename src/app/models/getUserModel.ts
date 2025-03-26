

import { UserModel } from './user';
// Prevent Mongoose from throwing an error if the model is already defined
export  async function getUserModel(){

    return UserModel; 
};
