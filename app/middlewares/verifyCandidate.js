const db = require('../models')

const Candidate = db.candidate

//CHECK IF THE USER IS ALREADY A CANDIDATE AND APPLYNG FOR THE SAME POSITION.
checkForExistingUserandSamePostion  = (req,res,next)=>{
    console.log(req.body);
    for (let i = 0 ; i<req.body.user.length ;i++) {
    console.log(req.body.user[i]);
    Candidate.findOne({
        user:req.body.user[i] //NAME IS NOT GOOD FOR VERYFING,Something like nationalid/schoold would work perfect
    }).exec((err,candidate)=>{
        console.log(candidate);
        if(err){
            res.status(500).send({message:err})
            return;
        }

        if (candidate){
            console.log('checkkked');
            
                res.status(400).send({ message: "Failed!Candidate already has position!" });
                return;
            
        }
        if(!candidate){
            next();
            return;
        }
    
        })
    }
}                                  

const verifyCandidate = {
    checkForExistingUserandSamePostion,
  };
  module.exports = verifyCandidate;