const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Position=db.positions;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getPostion = (req, res) => {
    Position.find({
        // 'status':true
    })
    .exec((err, position)=>{
        if(err){
            res.status(500).send({message:err});
        }
        pos=position.map(pos=>{
            return pos;
        })
        res.status(200).send({positions:pos})
    })
}
exports.createPosition = (req, res) => {
    console.log('here')
    studentId = Role.find({
        'name':'student'
    }).exec((err, student)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
          console.log(`THE STUDENT IS `);
          console.log(student[0]);
    
    console.log(student[0]._id);
    numberOfStudentUsers=User.countDocuments({
        'roles':student[0]._id
    },(err,countdoc)=>{
        console.log(countdoc);
    
    console.log('THE COINT IS');
    // console.log(numberOfStudentUsers);

    const position = new Position({
        name:req.body.name,
        noOfUsers:countdoc,
        noUsersVoted:0
    })


    position.save((err, position)=>{
        if(err){
            res.status(500).send({message:err});
        }
        position.save((err)=>{
            if(err){
                res.status(500).send({message:err});
            }
            res.status(200).send({message:'Position created successfully','token':req.headers["x-access-token"]})

        })
       
    })
})
})
}
exports.updateStatus = (req,res)=>{
    Position.updateOne(
        { _id: req.body._id }, // Filter
        { $set: { status: req.body.status } }, // Update
        { upsert: true } // add document with req.body._id if not exists
      )
        .then((obj) => {
           return res.status(200).send({'message':"Updated Position Status."});
         
          
        })
        .catch((err) => {
            res.status(500).send({"error":err});
        });
}
;