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
import logPageView from './middleware/logPageView.js';
import isAuthenticated from './middleware/isAuthenticated.js';
import PageView from './models/page-view.js';

connectToMongoDB();
const LocalStrategy = passportLocal.Strategy;

const app = express();
const PORT = process.env.PORT || 3000; // <- fallback
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Add middleware to parse form data
app.use(express.urlencoded({ extended: false }));

// Set up Express session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());
app.use(logPageView);

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

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
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

app.get("/123", isAuthenticated, (req, res) => {
  console.log(req.session.user);
  console.log(req.user);
  res.send("Hello World!");
  });

// Home page
app.get('/index.html', (req, res) => {
  Article.find().then((articles) => {
  res.render('index', { articles }); 
  }).catch((error) => {
  return res.status(500).json({ error: `An error occurred: ${error}` });
});
});

// Use authentication routes
app.use(authRoutes);

app.use(articleRouter);

// Use the router for all other routes
app.use(router);


// Analytics page
app.get('/analytics', isAuthenticated, async (req, res) => {
    const pageViews = await PageView.find({});
    res.render('analytics', { user: req.user, pageViews: pageViews });
});

app.use((req, res) => {
  res.status(404).send(`404 Not Found. You tried to access: ${req.originalUrl} (${req.method})`);
});

