const express = require('express');

const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));


app.listen(port, (req, res) => {
    console.log(`Listening on  Port ${port}`);
  }); 