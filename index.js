const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');

const todosRouter = require('./routes/todos');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments'); 

const app = express();
const port = 3000; 

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware for overriding methods
app.use(methodOverride('_method'));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//use the public folder for static serves
app.use(express.static(path.join(__dirname, 'public')));


// Middleware for logging requests
app.use((req, res, next) => {
  const time = new Date();
  console.log(`[${time.toISOString()}] ${req.method} to ${req.url}`);
  next();
});

// Use the todos routes
app.use('/api/todos', todosRouter);
app.use('/api/users', usersRouter);
app.use('/api/comments', commentsRouter);

// Render the main page with a form and list of To-Do items
app.get('/', (req, res) => {
  res.render('index', { todos: todosRouter.getTodos() });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});