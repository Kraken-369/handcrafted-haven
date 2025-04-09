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
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

export const UserModel = models.Users || model('users', userSchema);

  


