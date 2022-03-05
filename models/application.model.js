const mongoose = require("mongoose");

const Application = new mongoose.Schema(
  {
    jobSeekerId: { type: "objectID", required: true }, //id of jobber to display it later
    jobberId: { type: "objectID", required: true }, //id of jobber to display it later
    postId: { type: "objectID", required: true },
    applicationdate: { type: Date, default: Date.now, required: true }, //time of where the app was sent
    enum: ["pending", "accepted", "rejected"], //state of the application
  },
  { collection: "application-data" }
);

const model = mongoose.model("ApplicationData", Post);

module.exports = model;
