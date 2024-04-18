const express = require("express");
const router = express.Router();

const recipes = require("../data/recipes");


router
.route("/")
.get((req,res)=>{
    res.json(recipes);
})
.post((req,res)=>{

    // Extract recipe data from request body
  const { categoryId, title, description, ingredients, instructions } = req.body;

  // Validate input (example: ensure required fields are present)
  if (!categoryId || !title || !description || !ingredients || !instructions) {
    return res.status(400).json({ message: 'All fields are required' });

  } else {

    if (recipes.find((r) => r.title == req.body.title)) {
      res.json({ error: "already exist" });
      return;
    }

   // Create new recipe object
  const newRecipe = {
    id: recipes.length + 1, // Assign a unique ID (example: incrementing ID)
    categoryId,
    title,
    description,
    ingredients,
    instructions
  };

  // Add the new recipe to the recipes array (or your data store)

    recipes.push(newRecipe );

    // Respond with a success message and the new recipe
    res.status(201).json({ message: 'Recipe added successfully', recipe: newRecipe });

    
  }
  
});

  

 



module.exports = router;