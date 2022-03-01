require('dotenv').config();
const express = require("express");
const app = express()

const bodyParser = require('body-parser');

const bookRoute = require('./src/book/routes'); 
const authorRoute = require('./src/author/routes'); 
const publisherRoute = require('./src/publisher/routes'); 

const port = process.env.PORT;
const host = process.env.HOST;


app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bookRoute).use(publisherRoute).use(authorRoute);


app.listen(port, () => {
  console.log(`Example app listening on http://${host}:${port}`)
});