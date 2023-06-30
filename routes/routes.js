// routes.js
import express from 'express';
import Article from '../models/article.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
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

export default router;
