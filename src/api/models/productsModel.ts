import { Schema,  Types  ,model ,models } from 'mongoose';

const productsModel = new Schema({

  _id: { type: String, default: () => new Types.ObjectId().toString(),},
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: String, required: true  },
  categoryId: { type: Schema.Types.ObjectId,    ref: 'Category',    required: true, },
  artisanId: { type: Schema.Types.ObjectId, ref: 'users', required: true, },
 status: { type: String, enum: ["Available", "Out of stock"], required: true }
  ,
});
export const ProductsModel = models.products || model('products',productsModel);


 