import { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
  },
  {
    collection: 'categories',
    timestamps: false,
    versionKey: false,
  }
);

const Category = models.Category || model('Category', CategorySchema);

export default Category;
