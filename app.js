import express from 'express';
import mongoose from './seed.js';
import Post from './models/post.js';
import User from './models/user.js'; 
import router from './routes.js';
import path from 'path';
import Form from './models/form.js';

const app = express();
const PORT = 3000;
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Add middleware to parse form data
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);

// Using the mongoose instance from seed.js to connect to the db
mongoose.connection.once('open', () => {
  console.log('💽 Database connected');
  app.listen(PORT, () => {
    console.log(`👋 Started server on port ${PORT}`);
  });
});


// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Redirect requests for /index.html to the root path
app.get('/index.html', (req, res) => {
  res.redirect('/');
});

// Redirect requests for /about.html to /about
app.get('/about.html', (req, res) => {
  res.redirect('/about');
});

// Redirect requests for /contact.html to /contact
app.get('/contact.html', (req, res) => {
  res.redirect('/contact');
});

// Handle invalid routes with a 404 error 
app.post('/', (request, response) => {
  response.status(404).send('404 Not Found');
});

// Use the router for all other routes
app.use('/', router);


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

// Login functionality
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }); // Find the user in the database by their username
    if (!user) { // If the user is not found, send an error response
      res.status(401).send('Invalid username or password');
      return;
    }

    const isMatch = await user.comparePassword(password); // Use the comparePassword method to check if the password matches
    if (!isMatch) { // If the password does not match, send an error response
      res.status(401).send('Invalid username or password');
      return;
    }

    // If the username and password are valid, set a cookie and redirect to the analytics page
    res.cookie('loggedIn', true);
    res.redirect('/analytics');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Analytics page
app.get('/analytics', (req, res) => {
  const loggedIn = req.cookies.loggedIn;
  if (loggedIn) { // If the user is logged in, render the analytics page
    res.send('Analytics page');
  } else { // If the user is not logged in, redirect to the login page
    res.redirect('/login');
  }
});
