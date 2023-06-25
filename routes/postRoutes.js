import express from 'express';
import authMiddleware from './authMiddleware';
import Article from '../models/article';

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
        const article = new Article({ ...req.body, author: req.user._id });
        await article.save();
        return article;
    });
});

// Blog Post Retrieval
router.get('/articles/:id', (req, res) => {
    handleRequest(req, res, () => Article.findById(req.params.id).populate('author'));
});

// Blog Post Update
router.put('/articles/:id', authMiddleware, (req, res) => {
    handleRequest(req, res, async () => {
        const article = await Article.findOne({ _id: req.params.id, author: req.user._id });
        Object.assign(article, req.body);
        await article.save();
        return article;
    });
});

// Blog Post Deletion
router.delete('/articles/:id', authMiddleware, (req, res) => {
    handleRequest(req, res, () => Article.deleteOne({ _id: req.params.id, author: req.user._id }));
});

// Route for editing article
app.get('/articles/:id/edit', (req, res) =>{
    // Fetch article by id, then render the 'edit' view
    res.send('Edit article');
});

// Route for deleting article
app.post('/articles/:id/delete', (req, res) => {
    // Delete article by id, then re-render the article list
    res.send('Delete article');
    // deleteOne({ _id: req.params.id, author: req.user._id })
    // .then(() => {
    //     res.redirect('/articles');
});

export default router;
