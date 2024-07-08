const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const morgan = require("morgan");

//Middlware:

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});
app.use(morgan("dev"));

// Authentication middleware
const checkAuth = (req, res, next) => {
  const isAuthenticated = true; // Replace with actual authentication logic
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).send("You are not authenticated");
  }
};

// Authentication middleware for a specific route
app.get("/protected", checkAuth, (req, res) => {
  res.send("!!This is a protected route!!");
});

app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//Routes

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send("Form submitted successfully!");
});

app.get("/user/:name", (req, res) => {
  const { name } = req.params;
  res.render("user", { name });
});

//Download

app.get("/download", (req, res) => {
  const file = `${__dirname}/public/image.png`;
  res.download(file);
});
