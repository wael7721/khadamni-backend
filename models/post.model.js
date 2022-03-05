const mongoose = require("mongoose");

const Post = new mongoose.Schema(
  {
    jobberid: { type: "objectID", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dateofpost: { type: Date, default: Date.now, required: true },
  },
  { collection: "post-data" }
);

const model = mongoose.model("PostData", Post);

module.exports = model;
