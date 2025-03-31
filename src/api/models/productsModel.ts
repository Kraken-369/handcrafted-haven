import { Schema,  Types  ,model ,models } from 'mongoose';

const productsModel = new Schema({

  _id: { type: String, default: () => new Types.ObjectId().toString(),},
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: String, required: true  },
  category: { type:  String , enum:['Clothing & Accessories',
    'Jewelry', 'Home Decor' ,'Personal Care', 'Food & Beverages','Stationery & Paper Goods','Toys & Games', 'Artwork & Prints','Leather Goods','Miscellaneous Handmade Item'] , required: true },
  status: { type: String, enum: ["Available", "Out of stock"], required: true }
  ,
});
export const ProductsModel = models.products || model('products',productsModel);


 