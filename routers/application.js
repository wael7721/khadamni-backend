const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const Application=require("../models/application.model")
const Post = require("../models/post.model");

const { json, application } = require("express");
const ver = require("../verify");
const mongoose = require("mongoose");
const { populate } = require("../models/user.model");

const router = express.Router();
router.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/khademnitn", function (err, db) {
  if (err) {
    throw err;
  }
  console.log("db connected from application file");
});

router.post("/apply",async (req,res)=>{
         try {
           const token = req.headers["x-access-token"];
           const decoded = jwt.verify(token, "secret123");
           const user = await User.find({ email: decoded.email });
           if(user[0].enum!="jobseeker"){return res.json({status:401,message:"not job seeker"})}
           await Application.create({ApplicantId:user.id,postId:req.body.postid,enum:"pending"})
            }
           catch(error){return res.json({status:error})}
})   //apply for a service
router.get("/",async (req,res)=>{         
          try {
            const token = req.headers["x-access-token"];
            const decoded = jwt.verify(token, "secret123");
            const user = await User.find({ email: decoded.email });
            if (user[0].enum != "jobber") {
              return res.json({ status: 401, message: "not jobber" });
            } //first step is to find the posts of jobseeker
            let post = await Post.find({ jobberid: user._id });
            if (!post) {
              return res.json({ message: "you didnt make a post yet" });
            }
            application = Application.find({ postid: post.id }); //then find the applications that have id of the posts
            application.populate('applicantid',{name:1,_id:0})
           return res.json({application})
          }
           catch(error){return res.json({status:error})}
        }); //view jobseekers applied to application


module.exports = router;