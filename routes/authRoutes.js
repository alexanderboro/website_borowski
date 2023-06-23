import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user || !(await user.checkPassword(req.body.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        req.session.user = user;

        return res.json({ message: 'Logged in successfully' });

    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
});

export default router;