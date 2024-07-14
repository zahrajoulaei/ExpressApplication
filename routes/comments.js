const express = require('express');
const router = express.Router();

let comments = [];
let currentCommentId = 1;

// Middleware for generating unique IDs
const generateCommentId = () => currentCommentId++;

// GET all comments
router.get('/', (req, res) => {
    res.json(comments);
});

// POST a new comment
router.post('/', (req, res) => {
    const { userId, todoId, content } = req.body;
    const newComment = { id: generateCommentId(), userId, todoId, content };
    comments.push(newComment);
    res.redirect('/');
});

// GET a specific comment
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(comment => comment.id === parseInt(id, 10));
    if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(comment);
});

// PATCH (update) a comment
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const comment = comments.find(comment => comment.id === parseInt(id, 10));
    if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    if (content !== undefined) comment.content = content;
    res.json(comment);
});

// DELETE a comment
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(comment => comment.id !== parseInt(id, 10));
    res.redirect('/');
});

module.exports = router;