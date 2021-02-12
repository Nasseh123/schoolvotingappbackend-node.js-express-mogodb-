const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Position=db.positions;
const Candidate=db.candidate;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getCandidates = (req, res) => {
    Candidate.find()
    .populate(['user', 'position'])
    .exec((err, candidate)=>{
        if(err){
            res.status(500).send({message:err});
        }
        cand=candidate.map(pos=>{
            return pos;
        })
        res.status(200).send({candidate:cand})
    })
}
exports.createCandidate = (req, res) => {
    console.log('here')
    const candidate = new Candidate({
        user:req.body.user,
        position:req.body.position
    })
    console.log(candidate)
    candidate.save((err, position)=>{
        if(err){
            res.status(500).send({message:err});
        }
        position.save((err)=>{
            if(err){
                res.status(500).send({message:err});
            }
            res.status(200).send({message:'Candidate created successfully'})

        })
       
    })
}
;