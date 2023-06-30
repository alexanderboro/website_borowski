import express from 'express';
import User from '../models/user.js';
import Article from '../models/article.js';
import passport from 'passport';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), (req, res) => {
    res.redirect('/admin');
});

router.get("/admin", isAuthenticated, async (req, res) => {
    try {
        const articles = await Article.find().populate('author');
        return res.render("admin", { user: req.user, articles });
    } catch (error) {
    return res.status(500).json({ error: error.toString() });
    }
});


router.post('/logout', (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'You are not logged in' });
    } else {
        req.logout((err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({error: 'Logout failed'});
            }
            return res.redirect('/login.html');
        });
    }
});



export default router;