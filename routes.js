import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.post('/contact', (req, res) => {
  // Handle form submission
});

export default router;