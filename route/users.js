const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')

const users = require("../data/users");


router
.route("/")
.get((req,res)=>{
    res.json(users);
})

router
.route("/register")
.get((req,res)=>{
    res.render('register');  // views register
})
.post(async (req, res) => {

    try {
     
        const { username, password, email} = req.body;

      if (!username|| !password || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    
      } else if (users.find((u) => u.username == req.body.username )) {
          res.json({ error: `${username} already exist` });
          return;
      }else if (users.find((u) =>  u.email == req.body.email)) {
            res.json({ error: `${email} already exist` });
            return;
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { id: users.length + 1, username: req.body.username, password: hashedPassword, email:req.body.email }


      users.push(user)
      res.redirect('/api/users/login');
      res.status(201).json({ message: 'Registred successfully', user: user });
    } catch {
      res.status(500).send()
    }
  })


router
.route("/login")
.get( (req, res) => {
    res.render('login');  //views login
})
.post( async (req, res) => {
    const user = users.find(user => user.username === req.body.username)
    if (!user) {
      return res.status(400).send('Cannot find user')
    }
    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
        // res.send(`welcome ${req.body.username}`)
        //   Successful login: Redirect to /api/recipes
          res.redirect(`/api/recipes/${req.body.username}`);
        
      } else {
        res.send('Invalid password or username')
      }
    } catch {
      res.status(500).send()
    }
  })

  router
  .route("/logout")
    .delete((req, res) => {
       
        res.redirect('/login');
        // res.send('you have successfully logout')
    });



module.exports = router;