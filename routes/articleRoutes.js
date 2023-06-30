import express from 'express';
import authMiddleware from './authMiddleware.js';
import Article from '../models/article.js';
import { queryAndSendJsonResponse } from '../util.js';

const articleRouter = express.Router();

// Blog Post Creation
articleRouter.post('/articles', authMiddleware, (req, res) => {
    queryAndSendJsonResponse(req, res, async () => {
        const article = new Article({ ...req.body, author: req.user._id });
        await article.save();
        return article;
    });
});

// Article Creation
articleRouter.post('/articles', authMiddleware, (req, res) => {
    const { title, content } = req.body;
    const author = req.user.username; // Assuming the user object is stored in req.user after authentication
  
    const article = new Article({ title, content, author });
    // const article = new Article({ ...req.body, author: req.user._id });
    article.save()
      .then(() => {
        res.status(201).json({ message: 'Article created' });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Server error' });
      });
  });

// Blog Post Retrieval
articleRouter.get('/articles/:id', (req, res) => {
    queryAndSendJsonResponse(req, res, () => Article.findById(req.params.id).populate('author'));
});

articleRouter.get('/articles/:id', (req, res) => {
    queryAndSendJsonResponse(req, res, () => Article.findById(req.params.id).populate('author'));
});


// Route for rendering the view-article page
articleRouter.get('/articles/:id/view', (req, res) =>{
    // Fetch article by id, then render the 'view' view
    Article.findById(req.params.id)
    .then((article) => {
        res.render('article-view', { article });

    });
});

// List 
articleRouter.get('/articles', (req, res) => {
    Article.find().then((articles) => {
    res.render('article-list', { articles }); // Render the 'article-list' EJS template with the articles data
    }).catch((error) => {
    return res.status(500).json({ error: 'An error occurred' });
});
});




// Route for rendering the edit-article page
articleRouter.get('/articles/:id/edit', (req, res) =>{
    // Fetch article by id, then render the 'edit' view
    Article.findById(req.params.id)
    .then((article) => {
        res.render('article-edit', { article });
    // res.send('Edit article');
    });
});

// Route for editing articles
articleRouter.put('/articles/:id', async (req, res) => {
    const { title, content } = req.body;
    const updatedArticle = Article.findByIdAndUpdate(
    // { _id: req.params.id, author }, // Find the article by ID and author to ensure ownership
    req.params.id,
    { title, content },
    { new: true } 
    )    
    .then((updatedArticle) => {
    if (!updatedArticle) {
        return res.status(404).json({ message: `No Article with the id ${req.params.id} found` });
    }
    res.status(200).json({ message: 'Article updated' });
    })
    .catch((error) => {
    res.status(500).json({ message: 'Server error' });
    });
}); 

// Blog Post Update
articleRouter.put('/articles/:id', authMiddleware, (req, res) => {
    queryAndSendJsonResponse(req, res, async () => {
        const article = await Article.findOne({ _id: req.params.id, author: req.user._id });
        Object.assign(article, req.body);
        await article.save();
        return article;
    });
});

// Article Deletion
articleRouter.delete('/articles/:id', authMiddleware, (req, res) => {
    const author = req.user.username;
  
    // Article.findOneAndDelete({ _id: req.params.id, author }) // Find the article by ID and author to ensure ownership
    Article.findOneAndDelete(req.params.id) // Find the article by ID and author to ensure ownership
      .then((deletedPost) => {
        if (!deletedPost) {
          return res.status(404).json({ message: 'Article with the given ID not found' });
        }
        res.status(200).json({ message: 'Article deleted' });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Server error' });
      });
  });

// Blog Post Deletion
articleRouter.delete('/articles/:id', authMiddleware, (req, res) => {
    queryAndSendJsonResponse(req, res, () => Article.deleteOne({ _id: req.params.id, author: req.user._id }));
});

export default articleRouter;
