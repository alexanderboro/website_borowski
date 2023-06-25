import express from 'express';
import authMiddleware from './authMiddleware';
import Article from '../models/article';
import { queryAndSendJsonResponse } from '../util';

const router = express.Router();

// Blog Post Creation
router.post('/articles', authMiddleware, (req, res) => {
    queryAndSendJsonResponse(req, res, async () => {
        const article = new Article({ ...req.body, author: req.user._id });
        await article.save();
        return article;
    });
});


// Blog Post Retrieval
router.get('/articles/:id', (req, res) => {
    queryAndSendJsonResponse(req, res, () => Article.findById(req.params.id).populate('author'));
});

// List 
router.get('/articles', (req, res) => {
    queryAndSendJsonResponse(req, res, () => {
      Article.find()
        .populate('author')
        .exec((err, articles) => {
          if (err) {
            // Handle the error appropriately
            return res.status(500).json({ error: 'An error occurred' });
          }
          
          // Return the list of articles
          res.json(articles);
        });
    });
  });
  

// Blog Post Update
router.put('/articles/:id', authMiddleware, (req, res) => {
    queryAndSendJsonResponse(req, res, async () => {
        const article = await Article.findOne({ _id: req.params.id, author: req.user._id });
        Object.assign(article, req.body);
        await article.save();
        return article;
    });
});

// Blog Post Deletion
router.delete('/articles/:id', authMiddleware, (req, res) => {
    queryAndSendJsonResponse(req, res, () => Article.deleteOne({ _id: req.params.id, author: req.user._id }));
});

// Route for editing article
app.get('/articles/:id/edit', (req, res) =>{
    // Fetch article by id, then render the 'edit' view
    res.send('Edit article');
});

// Route for deleting article
app.post('/articles/:id/delete', (req, res) => {
    // Delete article by id, then re-render the article list
    res.send('Delete article');
    // deleteOne({ _id: req.params.id, author: req.user._id })
    // .then(() => {
    //     res.redirect('/articles');
});

export default router;
