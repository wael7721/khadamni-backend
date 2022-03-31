const mongoose = require("mongoose");

const Post = new mongoose.Schema(
  {
    jobberid: { type: mongoose.Schema.Types.ObjectId,ref:"UserData", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dateofpost: { type: Date, default: Date.now, required: true },
  },
  { collection: "post-data" }
);

const model = mongoose.model("PostData", Post);

module.exports = model;
