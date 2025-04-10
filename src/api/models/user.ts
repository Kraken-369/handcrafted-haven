import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'administrator' | 'artisan' | 'customer';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['administrator', 'artisan', 'customer'],
      default: 'artisan',
    },
  },
  {
    timestamps: false,
    versionKey: false
  }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
