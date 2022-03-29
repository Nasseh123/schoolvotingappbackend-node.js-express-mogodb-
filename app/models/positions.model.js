const mongoose = require("mongoose");

const Positions = mongoose.model(
  "Positions",
  new mongoose.Schema({
    name: String,
    noOfUsers:Number,
    noUsersVoted:{
      type:Number,
      default: 0
    }    ,
    studentclass:
    {
      type:mongoose.Schema.Types.ObjectID,
      ref:"StudentClass"
  },
    status:{
      type:Boolean,
      default: true
    },
  })
);

module.exports = Positions;
