const db = require("../models");

const Position = db.positions

checkForExistingPostion = (req, res) => {
    // Postion
    Position.findOne({
        name:req.body.name
    })
    .exec((err, position)=>{
        if(err){
            res.status(500).send({message:err})
            return;
        }
        if(position){
            res.status(400).send({ message: "Failed!Position already created!" });
            return;
        }
        if(!position){
            next();
            return;
        }

    })
}

const verifyposition = {
    checkForExistingPostion,
  };
  module.exports = verifyposition;