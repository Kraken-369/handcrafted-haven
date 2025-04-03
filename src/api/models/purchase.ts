import { Schema, model, models } from 'mongoose';

const PurchaseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user', required: true
    },
    products: [
      new Schema(
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true
          },
          quantity: {
            type: Number,
            required: true,
            min: 1
          },
          price: {
            type: Number,
            required: true
          }
        },
        { _id: false }
      )
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      enum: ['Debit Card', 'Credit Card'],
      default: 'Debit Card',
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  },
  { 
    collection: 'purchases',
    strict: false,
    timestamps: true,
    versionKey: false,
  } 
);

const Purchase = models.Purchase || model('Purchase', PurchaseSchema);

export default Purchase;
