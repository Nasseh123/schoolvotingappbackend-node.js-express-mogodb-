const db = require("../models");

const StudentClass = db.studentclass

checkForExistingClass = (req, res,next) => {
    // Postion
    StudentClass.findOne({
        name:req.body.name
    })
    .exec((err, studentclass)=>{
        if(err){
            res.status(500).send({message:err})
            return;
        }
        if(studentclass){
            res.status(400).send({ message: "Failed!Class already created/exists!" });
            return;
        }
        if(!studentclass){
            next();
            return;
        }

    })
}

const verifyclass = {
    checkForExistingClass,
  };
  module.exports = verifyclass;