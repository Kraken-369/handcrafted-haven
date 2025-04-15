import mongoose, { Schema, model, models, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: mongoose.Types.ObjectId;
  artisanId: mongoose.Types.ObjectId;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      min: 0,
      default: 1
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: (url: string) => /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url),
        message: 'Please provide a valid image URL.',
      },
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    artisanId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Product = models.Product || model<IProduct>('Product', ProductSchema);
export default Product;
