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
import articleRouter from './routes/articleRoutes.js';
import authRoutes from './routes/authRoutes.js';
import path from 'path';
import Form from './models/form.js';
import { queryAndSendJsonResponse } from './util.js';
import connectToMongoDB  from './seed.js';
import methodOverride from 'method-override';

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

// Using the mongoose instance from seed.js to connect to the DB
mongoose.connection.once('open', () => {
  console.log('💽 Database connected');
  app.listen(PORT, () => {
    console.log(`👋 Started server on port ${PORT}`);
  });
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// To allow PUT and DELETE requests to be sent via forms
app.use(methodOverride('_method'));

app.get("/123", (req, res) => {
  res.send("Hello World");
  });


// Use authentication routes
app.use(authRoutes);

app.use(articleRouter);

// Use the router for all other routes
app.use(router);


// Analytics page
app.get('/analytics', (req, res) => {
  if (req.session.userId) { // If the user is logged in, render the analytics page
    res.send('Analytics page');
  } else { // If the user is not logged in, redirect to the login page
    res.redirect('/login');
  }
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});
