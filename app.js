import dotenv from 'dotenv';
dotenv.config({ path: './session.env' });

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import mongoose, { ObjectId } from 'mongoose';
import Article from './models/article.js';
import User from './models/user.js'; 
import router from './routes/routes.js';
import authRoutes from './routes/authRoutes.js';
import path from 'path';
import Form from './models/form.js';
import { queryAndSendJsonResponse } from './util.js';
import connectToMongoDB  from './seed.js';

connectToMongoDB();
const LocalStrategy = passportLocal.Strategy;

const app = express();
const PORT = 3000;
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Add middleware to parse form data
app.use(express.urlencoded({ extended: false }));

// Set up Express session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());
console.log("hello world");

// // Redirect requests for /index.html to the root path
// app.post('/login', (req, res) => {
//   res.send('hello world');
// });

// Passport Local Strategy
passport.use(new LocalStrategy(
  async (username, password, done) => {
    const user = await User.findOne({ username });

    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

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

app.get("/123", (req, res) => {
  res.send("Hello World");
  });

// Redirect requests for /about.html to /about
app.get('/about.html', (req, res) => {
  console.log("123");
  res.redirect('/about');
});

// Redirect requests for /contact.html to /contact
app.get('/contact.html', (req, res) => {
  res.redirect('/contact');
});

app.post('/articles', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
    article.save()
    .then(() => {
      res.send('Post created');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Server error');
    });
});

app.get('/articles', async (req, res) => {
    try {
      const articles = await Article.find().populate('author'); // Fetch all articles and populate the 'author' field
      res.render('article-list', { articles }); // Render the 'article-list' EJS template with the articles data
    } catch (error) {
      // Handle the error appropriately
      res.status(500).json({ error: 'An error occurred' });
    }
});

// Handle invalid routes with a 404 error 
app.post('/', (request, response) => {
  response.status(404).send('404 Not Found');
});


// Use authentication routes
app.use('/', authRoutes);

// Use the router for all other routes
app.use('/', router);



// app.get('/articles', (request, res) => {
//   // const article = new Article({
//   //   title: 'My favorite spot in Lisbon',
//   //   content: 'This is a great city for exploring and trying new things.',
//   //   author: 'Alexander Borowski'
//   // });
//   // article.save()
//   //   .then(() => {
//   //     response.send('Post created');
//   //   })
//   //   .catch((error) => {
//   //     console.error(error);
//   //     response.status(500).send('Server error');
//   //   });

//   res.send('hello article');
// });






// Analytics page
app.get('/analytics', (req, res) => {
  if (req.session.userId) { // If the user is logged in, render the analytics page
    res.send('Analytics page');
  } else { // If the user is not logged in, redirect to the login page
    res.redirect('/login');
  }
});
