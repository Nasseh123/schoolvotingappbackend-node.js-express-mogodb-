const db = require('../models')

const Candidate = db.candidate

//CHECK IF THE USER IS ALREADY A CANDIDATE AND APPLYNG FOR THE SAME POSITION.
checkForExistingUserandSamePostion  = (res,req)=>{
    Candidate.findOne({
        name:req.name
    }).exec((err,candidate)=>{
        if(err){
            res.status(500).send({message:err})
            return;
        }

        if (candidate){
            
            // candidate.position.find({
            //     position_name:candidate.position.name

            // })
        }
    })
}                                  