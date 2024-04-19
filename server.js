const express = require('express');

const bodyParser = require("body-parser");

const user = require("./data/users");
const recipe = require("./data/recipes");




const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Serve static files from the 'css' directory
app.use('/public', express.static('public'));



// Set EJS as the view engine
app.set('view engine', 'ejs');



const usernameExist = (req, res, next) => {
    // Extract the username from the request parameters or body
    const username = req.params.username;

    // Check if the username exists in the users data
    const userExists = user.some(user => user.username === username);

    // If the username exists, proceed to  next 
    if (userExists) {
        return next();
    }

    // If the username does not exist, return an error response
    return res.status(404).json({ message: 'User not found' });
};

// app.use('/api/recipes/:username',usernameExist);

module.exports.usernameExist = usernameExist;

const validateRecipeData = (req, res, next) => {
    const { categoryId, title, description, ingredients, instructions } = req.body;

    // Validate input 
    if (!categoryId || !title || !description || !ingredients || !instructions) {
        return res.status(400).json({ message: 'All fields are required' });
    } else {

        if (recipe.find((r) => r.title == req.body.title)) {
          res.json({ error: "already exist" });
          return;
        }
    }
    next();
};

// app.use('/api/recipes/:username',validateRecipeData);

module.exports.validateRecipeData = validateRecipeData;



  

//route imports
const users = require("./route/users");
const categories = require("./route/categories");
const recipes = require("./route/recipes");



// Use our Routes
app.use("/api/users", users);
app.use("/api/categories", categories);
app.use("/api/recipes", recipes);

app.get("/", (req, res) => {
    res.send("Recipes Application in progress!");
  });





  

  // 404 Middleware
  app.use((req, res) => {
    res.status(404);
    res.json({ error: "Resource Not Found" });
  });




app.listen(port, (req, res) => {
    console.log(`Listening on  Port ${port}`);
  }); 