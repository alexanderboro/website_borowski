import mongoose from 'mongoose';

const PageViewSchema = new mongoose.Schema({
  pageUrl: String,
  views: { type: Number, default: 0 },
});

const PageView = mongoose.model('PageView', PageViewSchema);

export default PageView;
