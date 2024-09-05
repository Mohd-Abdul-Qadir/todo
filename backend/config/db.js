const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://moabdulqadirmbd:abdul@cluster0.in2uw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("no connection", err);
  });
