import PageView from '../models/page-view.js'; // Assuming your model file is named pageView.js

const logPageView = async (req, res, next) => {
  const url = req.originalUrl;
  
  try {
    let pageView = await PageView.findOne({ pageUrl: url });

    if (pageView) {
      pageView.views++;
    } else {
      pageView = new PageView({ pageUrl: url, views: 1 });
    }
    
    pageView.save().catch(err => console.error(err));
  } catch(err) {
    console.error(err);
  }
  
  next();
};

export default logPageView;