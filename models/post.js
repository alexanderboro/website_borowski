/* Example from the course 
const cookieSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  priceInCents: { type: Number, required: true }, 
  isInStock: { type: Boolean, default: true, required: true }
}) 
*/ 


import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    ref: 'User'
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', PostSchema);

export default Post;