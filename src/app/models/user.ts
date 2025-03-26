// models/user.ts
import mongoose,  { Schema,  Document, Types  ,Model } from 'mongoose';


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


// export const UserModel: Model<UserDocument> = mongoose.models.users || mongoose.model<UserDocument>('users', userSchema);
// export const UserModel = mongoose.models.User || mongoose.model<UserDocument>('users', userSchema , 'users');
//export const UserModel: Model<UserDocument> = mongoose.models.users || mongoose.model<UserDocument>('users', userSchema);

  export const UserModel: Model<UserDocument> = mongoose.models.users || mongoose.model<UserDocument>('users', userSchema);