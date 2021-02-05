const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Position=db.positions;
const Candidate=db.candidate;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getPostion = (req, res) => {
    Position.find()
    .exec((err, position)=>{
        if(err){
            res.status(500).send({message:err});
        }
        pos=position.map(pos=>{
            return pos;
        })
        res.status(200).send({positionname:pos.name})
    })
}
exports.createCandidate = (req, res) => {
    console.log('here')
    const position = new Candidate({
        name:req.body.name
    })
    console.log(position)
    position.save((err, position)=>{
        if(err){
            res.status(500).send({message:err});
        }
        position.save((err)=>{
            if(err){
                res.status(500).send({message:err});
            }
            res.status(200).send({message:'Position created successfully'})

        })
       
    })
}
;