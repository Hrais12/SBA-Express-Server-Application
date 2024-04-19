const express = require("express");
const router = express.Router();
const {usernameExist} = require('../server')
const {validateRecipeData} = require('../server')


const recipes = require("../data/recipes");
const users = require("../data/users");




router
.route("/:username")
.get((req,res)=>{
    
    const username = req.params.username;
    const recipeId = req.params.recipeId;
    res.render('recipes', {  username: username, recipes: recipes });  //views recipes
})

router
.route("/:username/newRecipe")
.get((req,res)=>{
    const username = req.params.username
    res.render('newRecipe', { username: username });
})
.post(usernameExist,validateRecipeData,(req,res)=>{

    const username = req.params.username

    // Extract recipe data from request body
  const { categoryId, title, description, ingredients, instructions } = req.body;

    // Find the user based on the provided username
    const user = users.find((u) => u.username === req.params.username);

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
   
    // res.status(201).json({ message: 'Recipe added successfully', recipe: newRecipe });

    res.redirect(`/api/recipes/${username}`);



});



// router
//   .route("/:username/:id")
//   .get((req, res, next) => {
//     const recipe = recipes.find((r) => r.id == req.params.id);
//     if (recipe) res.json(recipe);
//     else next();
//   })
// .patch((req, res, next) => {
//     const recipe= recipes.find((r, i) => {
//       if (r.id == req.params.id) {
//         for (const key in req.body) {
//             recipes[i][key] = req.body[key];
//         }
//         return true;
//       }
//     });

//     if (recipe) res.json(recipe);
//     else next();
//   })
//   .delete((req, res, next) => {
//     const recipe = recipes.find((r, i) => {
//       if (r.id == req.params.id) {
//         recipes.splice(i, 1);
//         return true;
//       }
      
//     });

//     if (recipe) res.json(recipe);
//     else next();
//   });


router
  .route("/:username/:recipeId/editRecipe")
  .get((req, res, next) => {


    const username = req.params.username;

    
    const recipeId = req.params.recipeId;

    const recipe = recipes.find((r) => r.id == recipeId); 

    if (recipe)  res.render("editRecipe",{recipeId: recipeId , username: username , recipe: recipe });
    else next();
  })
  .post((req, res, next) => {

    const username = req.params.username;
    const recipeId = req.params.recipeId;

    const recipe = recipes.find((r, i) => {
      if (r.id == req.params.recipeId) {
        for (const key in req.body) {
            recipes[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (recipe) 
    res.redirect(`/api/recipes/${username}`);
    else next();
  })
  .patch((req, res, next) => {

    const username = req.params.username;
    const recipeId = req.params.recipeId;

    const recipe = recipes.find((r, i) => {
      if (r.id == req.params.recipeId) {
        for (const key in req.body) {
            recipes[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (recipe) 
    res.redirect(`/api/recipes/${username}`);
    else next();
  })

  router
  .route("/:username/:recipeId/delete")

  //I used the post method to mimic the delete to link it to the delete button since the 
  // HTML forms only support GET and POST methods, i used a POST request with a
  // hidden input field to mimic a overide the POST method in the form.
  .post((req, res, next) => {
    const username = req.params.username;
    const recipeId = req.params.recipeId;

    const recipe = recipes.find((r, i) => {
      if (r.id == req.params.recipeId) {
        recipes.splice(i, 1);
        return true;
      }
      
    });

    if (recipe) res.redirect(`/api/recipes/${username}`);
    
    else next();
  })
  .delete((req, res, next) => {
    const username = req.params.username;
    const recipeId = req.params.recipeId;

    const recipe = recipes.find((r, i) => {
      if (r.id == req.params.recipeId) {
        recipes.splice(i, 1);
        return true;
      }
      
    });

    if (recipe) res.redirect(`/api/recipes/${username}`);
    
    else next();
  });


  

 



module.exports = router;