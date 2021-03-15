const mongoose = require("mongoose");

const Positions = mongoose.model(
  "Positions",
  new mongoose.Schema({
    name: String,
    noOfUsers:Number,
    noUsersVoted:{
      type:Number,
      default: 0
    },
    status:{
      type:Boolean,
      default: true
    },
  })
);

module.exports = Positions;
