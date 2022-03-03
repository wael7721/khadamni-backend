const mongoose = require("mongoose");

const Post = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dateofpost: { type: String, required: true },
  },
  { collection: "post-data" }
);

const model = mongoose.model("PostData", Post);

module.exports = model;
