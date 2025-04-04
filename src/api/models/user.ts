import { Schema,  Types  ,model ,models } from 'mongoose';

const userSchema = new Schema({
  _id: {
    type: String,
    default: () => new Types.ObjectId().toString(),
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
});

export const UserModel = models.user ||  model('user',userSchema); 
  


