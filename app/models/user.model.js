const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    imageUrl:String,
    votingStatus:{
      type:Boolean,
      default: false
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    class:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'StudentClass'
    }
  })
);

module.exports = User;