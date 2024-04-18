const express = require("express");
const router = express.Router();

const recipes = require("../data/recipes");


router
.route("/")
.get((req,res)=>{
    res.json(recipes);
})


module.exports = router;