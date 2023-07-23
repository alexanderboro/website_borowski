import PageView from '../models/page-view.js';

const trackedUrls = ['/articles', '/index', '/about', '/contact'];

const logPageView = async (req, res, next) => {
  const url = req.originalUrl;

  // Checking if the current URL should be tracked
  if (trackedUrls.some((trackedUrl) => url.startsWith(trackedUrl))) {
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
  }

  next();
};

export default logPageView;