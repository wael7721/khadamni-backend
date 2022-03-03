const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { json } = require("express");

const router = express.Router();
router.use(express.json());

router.delete("/api/user", async (req, res) => {
  const token = req.headers["x-access-token"];
  decoded = jwt.verify(token, "secret123");
  if (!isAdmin) {
    res.json({ status: "error", error: "unauthorised access" });
  }
  try {
    await User.deleteOne({ email: req.body.email });
  } catch (err) {
    res.json({ status: err, error: "couldnt delete" });
  }
});
isAdmin = () => {
  return true;
};

module.exports = router;