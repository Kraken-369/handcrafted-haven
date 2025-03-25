// models/user.ts
import  { Schema, model , Document, Types } from 'mongoose';

export interface UserDocument extends Document {
  _id: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserDocument>({
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

// Prevent Mongoose from throwing an error if the model is already defined
export const getUserModel = () => {
  try {
    return model<UserDocument>('User', userSchema);
  } catch (error) {

      throw new Error('Failed to create User model');
  }
};

// export const User = model<UserDocument>('User', userSchema);
export type UserUpdate = Omit<UserDocument, '_id'>;