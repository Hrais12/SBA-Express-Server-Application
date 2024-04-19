const express = require("express");
const router = express.Router();
const {usernameExist} = require('../server')

const recipes = require("../data/recipes");
const users = require("../data/users");




router
.route("/")
.get((req,res)=>{
    res.json(recipes);
})

router
.route("/:username")
.post(usernameExist,(req,res)=>{

    // Extract recipe data from request body
  const { categoryId, title, description, ingredients, instructions } = req.body;

//   const username = req.params.username; // Extract username from URL


  // Validate input (example: ensure required fields are present)
  if (!categoryId || !title || !description || !ingredients || !instructions) {
    return res.status(400).json({ message: 'All fields are required' });

  } else {

    if (recipes.find((r) => r.title == req.body.title)) {
      res.json({ error: "already exist" });
      return;
    }

    // Find the user based on the provided username
    const user = users.find((u) => u.username === req.params.username);

    // // Check if user is found
    // if (!user) {
    //   return res.status(404).json({ error: 'User not found' });
    // }

    //Get the user's ID
    const userId = user.id;


   // Create new recipe object
  const newRecipe = {
    id: recipes.length + 1, // Assign a unique ID 
    categoryId,
    title,
    description,
    ingredients,
    instructions,
    userId
  };

  

    recipes.push(newRecipe );

    // Respond with a success message and the new recipe
    res.status(201).json({ message: 'Recipe added successfully', recipe: newRecipe });

    
  }
  
});



router
  .route("/:id")
  .get((req, res, next) => {
    const recipe = recipes.find((r) => r.id == req.params.id);
    if (recipe) res.json(recipe);
    else next();
  })
  .patch((req, res, next) => {
    const recipe= recipes.find((r, i) => {
      if (r.id == req.params.id) {
        for (const key in req.body) {
            recipes[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (recipe) res.json(recipe);
    else next();
  })
  .delete((req, res, next) => {
    const recipe = recipes.find((r, i) => {
      if (r.id == req.params.id) {
        recipes.splice(i, 1);
        return true;
      }
      
    });

    if (recipe) res.json(recipe);
    else next();
  });


  

 



module.exports = router;