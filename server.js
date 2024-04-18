const express = require('express');

const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));




//route imports
const users = require("./route/users");
const categories = require("./route/categories");
const recipes = require("./route/recipes");



// Use our Routes
app.use("/api/users", users);
app.use("/api/categories", categories);
app.use("/api/recipes", recipes);







app.listen(port, (req, res) => {
    console.log(`Listening on  Port ${port}`);
  }); 