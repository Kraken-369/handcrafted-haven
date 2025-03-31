import { Schema,  Types  ,model ,models } from 'mongoose';

const postSchema = new Schema({
  _id: {
    type: String,
    default: () => new Types.ObjectId().toString(),
  },
  msg: {
    type: String,
    required: true,
    unique: true,
  },
  optional: {
    type: String,
    required: false,
  },
});

export const PostModel = models.post || model('post',postSchema);