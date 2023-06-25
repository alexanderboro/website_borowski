// routes.js
import express from 'express';
import Article from '../models/article.js';
import authMiddleware from './authMiddleware.js';
import Form from '../models/form.js';

const router = express.Router();

// Homepage
router.get('/', (req, res) => {
  res.render('index');
});

// About Page
router.get('/about', (req, res) => {
  res.render('about');
});

// Contact Form Submission
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const form = new Form({ name, email, message });
  form.save()
    .then(() => {
      res.send('Thanks for submitting the form!');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Server error');
    });
});

// Article Creation
router.post('/articles', authMiddleware, (req, res) => {
  const { title, content } = req.body;
  const author = req.user.username; // Assuming the user object is stored in req.user after authentication

  const article = new Article({ title, content, author });
  article.save()
    .then(() => {
      res.status(201).json({ message: 'Article created' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Server error' });
    });
});

// Article Update
router.put('/articles/:id', authMiddleware, (req, res) => {
  const { title, content } = req.body;
  const author = req.user.username;

  Article.findOneAndUpdate(
    { _id: req.params.id, author }, // Find the article by ID and author to ensure ownership
    { title, content },
    { new: true }
  )
    .then((updatedArticle) => {
      if (!updatedArticle) {
        return res.status(404).json({ message: 'Article not found' });
      }
      res.status(200).json({ message: 'Article updated' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Server error' });
    });
});

// Article Deletion
router.delete('/articles/:id', authMiddleware, (req, res) => {
  const author = req.user.username;

  Article.findOneAndDelete({ _id: req.params.id, author }) // Find the article by ID and author to ensure ownership
    .then((deletedPost) => {
      if (!deletedPost) {
        return res.status(404).json({ message: 'Article not found' });
      }
      res.status(200).json({ message: 'Article deleted' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Server error' });
    });
});

export default router;
