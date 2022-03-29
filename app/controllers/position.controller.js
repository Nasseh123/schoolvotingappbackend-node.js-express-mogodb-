const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Position=db.positions;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getPostion = (req, res) => {
    Position.find({
        'status':true
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

exports.getspecPostion = (req, res) => {
    Position.find({
        'status':true,
        'studentclass':[req.body.class,null]
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

exports.explicitgetPostion = (req, res) => {
    Position.find({
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
    if(req.body.selectedclass){

    }
    let data = {}
    console.log(req.body.selectedclass);
    if (req.body.selectedclass !=null){
        data =  {
            'roles':student[0]._id,
            'class':req.body.selectedclass
        
        }
    }else{
       data =  {
            'roles':student[0]._id
        
        }
    }
    numberOfStudentUsers=User.countDocuments(data,(err,countdoc)=>{
        console.log(countdoc);
    
    console.log('THE COINT IS');
    console.log(req.body);

    const position = new Position({
        name:req.body.name,
        noOfUsers:countdoc,
        noUsersVoted:0,

        studentclass:req.body.selectedclass
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
};

exports.deletePosition= (req, res)=>{
    console.log(req.body);
    Position.deleteOne({ _id: req.body._id },(err,deletedres)=>{
        if (err){
            res.status(500).send({message:err});
        }else{
            console.log(deletedres);
            res.status(200).send({'message':"Postion  Deleted Succesfully."});
        }
    })
           
         
};