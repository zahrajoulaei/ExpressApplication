const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.render('index');
  });
  
  app.get('/about', (req, res) => {
    res.render('about');
  });
  
  app.get('/form', (req, res) => {
    res.render('form');
  });
  
  app.post('/submit', (req, res) => {
    console.log(req.body);
    res.send('Form submitted successfully!');
  });

  app.get('/user/:name', (req, res) => {
    const { name } = req.params;
    res.render('user', { name });
  });