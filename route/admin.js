const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { json } = require("express");
const ver = require("../verifictationenum");
const mongoose = require("mongoose");

const router = express.Router();
router.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/khademnitn", function (err, db) {
  if (err) {
    throw err;
  }
  console.log("db connected from admin");
});

router.delete("/user", async (req, res) => {
//sprint2:delete user
  try {
    const token = req.headers["x-access-token"];
    decoded = jwt.verify(token, "secret123");
    const user = await User.find({ email: decoded.email }, { enum: 1 });
    if (!user) {
      return res.json({ error: "token invalid" });
    }
    if (user[0].enum != "admin") {
      return res.json((error = "unauthorized access"));
    }
    await User.findOneAndDelete({ email: decoded.email });
    return res.json({result:"user deleted"})
  } catch (err) {
    res.json({ error: err, message: "couldnt delete" });
  }
});

module.exports = router;
