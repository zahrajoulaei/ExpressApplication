const express = require('express');
const router = express.Router();

let users = [];
let currentUserId = 1;

// Middleware for generating unique IDs
const generateUserId = () => currentUserId++;

// GET all users
router.get('/', (req, res) => {
    res.json(users);
});

// POST a new user
router.post('/', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: generateUserId(), name, email };
    users.push(newUser);
    res.redirect('/');
});

// GET a specific user
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === parseInt(id, 10));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// PATCH (update) a user
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = users.find(user => user.id === parseInt(id, 10));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    res.json(user);
});

// DELETE a user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter(user => user.id !== parseInt(id, 10));
    res.redirect('/');
});

module.exports = router;