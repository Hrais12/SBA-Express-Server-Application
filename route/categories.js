const express = require("express");
const router = express.Router();

const categories = require("../data/categories");



router
.route("/")
.get((req,res)=>{
    res.json(categories);
})


module.exports = router;