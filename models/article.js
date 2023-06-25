/* Example from the course 
const cookieSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  priceInCents: { type: Number, required: true }, 
  isInStock: { type: Boolean, default: true, required: true }
}) 
*/ 


import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const Article = mongoose.model('Article', ArticleSchema);

export default Article;
