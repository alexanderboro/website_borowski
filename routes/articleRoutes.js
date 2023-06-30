import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import Article from '../models/article.js';
import { queryAndSendJsonResponse } from '../util.js';

const articleRouter = express.Router();

// List all articles
articleRouter.get('/articles', (req, res) => {
    Article.find().then((articles) => {
    res.render('article-list', { articles }); // Render the 'article-list' EJS template with the articles data
    }).catch((error) => {
    return res.status(500).json({ error: 'An error occurred' });
});
});

// Route for rendering the view-article page
articleRouter.get('/articles/:id', (req, res) =>{
    // Fetch article by id, then render the 'view' view
    Article.findById(req.params.id)
    .then((article) => {
        res.render('article-view', { article });

    });
});


// Blog Post Creation
articleRouter.post('/articles', isAuthenticated, (req, res) => {
    queryAndSendJsonResponse(req, res, async () => {
        const article = new Article({ ...req.body, author: req.user.username });
        await article.save();
        return article;
    });
});

// Route for rendering the edit-article page
articleRouter.get('/articles/:id/edit', isAuthenticated, (req, res) =>{
    // Fetch article by id, then render the 'edit' view
    Article.findById(req.params.id)
    .then((article) => {
        res.render('article-edit', { article });
    });
});

// Blog Post Update
articleRouter.put('/articles/:id', isAuthenticated, (req, res) => {
    queryAndSendJsonResponse(req, res, async () => {
        const article = await Article.findOne({ _id: req.params.id});
        Object.assign(article, req.body);
        await article.save();
        return article;
    });
    console.log(`Article ${req.params.id} updated`);
});

// Blog Post Deletion
articleRouter.delete('/articles/:id', isAuthenticated, (req, res) => {
    queryAndSendJsonResponse(req, res, () => Article.deleteOne({ _id: req.params.id} ));
    console.log(`Article ${req.params.id} deleted`);
});

export default articleRouter;
