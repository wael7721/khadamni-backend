const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./models/user.model");  
const Post = require("./models/post.model");
const mongoose=require('mongoose')
const jwt = require("jsonwebtoken");
const { json } = require("express");

app.use(cors());
app.use(express.json());


app.use('/api/user',require('./route/user'))
app.use('/api/admin',require('./route/admin'))


app.listen(1337, () => {
  console.log("Server started on 1337");
});


