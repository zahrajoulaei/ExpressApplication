const express = require('express');
const router = express.Router();

let todos = [];
let currentId = 1; 

// Middleware for generating unique IDs
const generateId = () => currentId++; 

// GET all To-Do items
router.get('/', (req, res) => {
    res.json(todos);
});

// POST a new To-Do item
router.post('/', (req, res) => {
    const { title, description } = req.body;
    const newTodo = { id: generateId(), title, description, completed: false };
    todos.push(newTodo);
    res.redirect('/');
});

// GET a specific To-Do item
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(todo => todo.id === parseInt(id, 10)); 
    if (!todo) {
        return res.status(404).json({ error: 'To-Do item not found' });
    }
    res.render('todo', { todo });
});

// PATCH (update) a To-Do item
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const todo = todos.find(todo => todo.id === parseInt(id, 10)); 
    if (!todo) {
        return res.status(404).json({ error: 'To-Do item not found' });
    }
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;
    res.json(todo);
});

// DELETE a To-Do item
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== parseInt(id, 10));
    res.redirect('/');
});

// A function to get todos (for rendering in EJS)
router.getTodos = () => todos;

module.exports = router;