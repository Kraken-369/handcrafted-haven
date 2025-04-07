import { Schema,  Types  ,model ,models } from 'mongoose';

const userSchema = new Schema({
  _id: {
    type: String,
    default: () => new Types.ObjectId().toString(),
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String, enum:['artisan','admin','user'] ,
    required: true,
    
  },
  status: {
    type: String,enum:['pending','verified','suspended'] ,
    required: true,
  },
});

export const UserModel = models.user ||  model('user',userSchema); 
  


