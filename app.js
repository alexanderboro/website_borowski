import express from 'express';
import mongoose from 'mongoose';
import Post from './models/post.js';
import path from 'path';
import Form from './models/form.js';


const app = express();
const PORT = 3000;
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Add middleware to parse form data
app.use(express.urlencoded({ extended: true }));


mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017')
  .then(() => console.log('💽 Database connected'))
  .catch(error => console.error(error));

app.listen(PORT, () => {
  console.log(`👋 Started server on port ${PORT}`);
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/', (request, response) => {
  response.send('Invalid route');
});

app.post('/posts', (request, response) => {
  const post = new Post({
    title: 'My favorite spot in Lisbon',
    content: 'This is a great city for exploring and trying new things.',
    author: 'Alexander Borowski'
  });
  post.save()
    .then(() => {
      response.send('Post created');
    })
    .catch((error) => {
      console.error(error);
      response.status(500).send('Server error');
    });
});


// Get the form data from the request body
app.post('/contact', (req, res) => {
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
