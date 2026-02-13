const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  title: String,
  tag: String,
  description: String,
  starting: String,
});

module.exports = mongoose.model("Service", ServiceSchema);
