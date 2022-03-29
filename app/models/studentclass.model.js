const mongoose = require("mongoose");

const StudentClass = mongoose.model(
  "StudentClass",
  new mongoose.Schema({
    name: String,
    status:{
      type:Boolean,
      default: true
    },
  })
);

module.exports = StudentClass;
