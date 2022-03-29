const mongoose = require("mongoose");

const Candidate = mongoose.model(
  "Candidate",
  new mongoose.Schema({
    user:
        {
            type:mongoose.Schema.Types.ObjectID,
            ref:"User"
        }
    ,
    points:{
      type:Number,
      default:0
    },
    position: 
        {
            type:mongoose.Schema.Types.ObjectID,
            ref:"Positions"
        }

,
    status:{
      type:Boolean,
      default:true,
    },
  })
);

module.exports = Candidate;