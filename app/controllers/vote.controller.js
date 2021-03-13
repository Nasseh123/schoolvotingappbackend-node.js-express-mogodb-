const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Position=db.positions;
const Candidate=db.candidate;
const  currentuser= require("../middlewares/currentuser");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.newVote=(req, res)=>{
    // console.log(req);
    let token = req.headers["x-access-token"];
  

      // given a payload object of { username: 'bob', userid: 1, email: 'bob@example.com' }
    currentUser=jwt.decode(token, config.secret)
   
        User.updateOne(
            { "_id": currentUser.id}, // Filter
          {$set: {"votingStatus": true}}, // Update
          {upsert: true} // add document with req.body._id if not exists 

     )
    .then((obj) => {
       console.log('Updated User Voting Status.');
      
 })
.catch((err) => {
   console.log('Error: ' + err);
})

    req.body.forEach(x=>{
        // console.log(x.candidate);
       
            Candidate.find(
                {
                    "user":(x.candidate.id)
                  }).exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
                  
                //   console.log(user);
                  Candidate.updateOne(
                    { "_id": user[0]['_id']}, // Filter
                  {$set: {"points": user[0]['points'] +=1}}, // Update
                  {upsert: true} // add document with req.body._id if not exists 

             )
            .then((obj) => {
               console.log('Updated Candidates votes.');
              
         })
        .catch((err) => {
           console.log('Error: ' + err);
      }) })



        })

    
    

}
exports.createCandidate = (req, res) => {
    console.log('here')
    let respons=[]
    for (let i = 0 ; i<req.body.user.length ;i++) {
        const candidate = new Candidate({
            user:req.body.user[i],
            position:req.body.position
        })
        candidate.save((err, candidate)=>{
            if(err){
                respons[i]= err
                // res.status(500).send({message:err});
            }
            candidate.save((err)=>{
                if(err){
                    respons[i]= err
                    res.status(500).send({message:err});
                }
                respons[i]= {message:'Candidate created successfully'}
                // res.status(200).send({message:'Candidate created successfully'})
    
            })
           
        })
    }
    res.send(respons)
   
}
;