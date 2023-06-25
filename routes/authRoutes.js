import express from 'express';
import User from '../models/user.js';
import Article from '../models/article.js';


const router = express.Router();

router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !(await user.checkPassword(req.body.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        req.session.user = user;
        const articles = await Article.find().populate('author');


        return res.render("admin", { user: req.session.user, articles });

    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
});

export default router;