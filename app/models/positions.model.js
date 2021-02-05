const mongoose = require("mongoose");

const Positions = mongoose.model(
  "Positions",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Positions;
