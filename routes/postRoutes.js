import express from 'express';
import authMiddleware from './authMiddleware';
import Post from '../models/post';

const router = express.Router();

// Handle request and send response
const handleRequest = async (req, res, operation) => {
    try {
        const result = await operation();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

// Blog Post Creation
router.post('/articles', authMiddleware, (req, res) => {
    handleRequest(req, res, async () => {
        const post = new Post({ ...req.body, author: req.user._id });
        await post.save();
        return post;
    });
});

// Blog Post Retrieval
router.get('/articles/:id', (req, res) => {
    handleRequest(req, res, () => Post.findById(req.params.id).populate('author'));
});

// Blog Post Update
router.put('/articles/:id', authMiddleware, (req, res) => {
    handleRequest(req, res, async () => {
        const post = await Post.findOne({ _id: req.params.id, author: req.user._id });
        Object.assign(post, req.body);
        await post.save();
        return post;
    });
});

// Blog Post Deletion
router.delete('/articles/:id', authMiddleware, (req, res) => {
    handleRequest(req, res, () => Post.deleteOne({ _id: req.params.id, author: req.user._id }));
});

export default router;
