const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Position = db.positions;
const Candidate = db.candidate;
const currentuser = require("../middlewares/currentuser");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.newVote = (req, res) => {
  // console.log(req);
  let token = req.headers["x-access-token"];

  // given a payload object of { username: 'bob', userid: 1, email: 'bob@example.com' }
  currentUser = jwt.decode(token, config.secret);

  User.updateOne(
    { _id: currentUser.id }, // Filter
    { $set: { votingStatus: true } }, // Update
    { upsert: true } // add document with req.body._id if not exists
  )
    .then((obj) => {
      console.log("Updated User Voting Status.");
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
  console.log(req.body);

  req.body.forEach((x) => {
    // console.log(x.candidate);
    Position.find({
      name: x["position"],
    }).exec((err, pos) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log("CHECKING FOR SIMILAR USERS");
      console.log(pos[0]["noOfUsers"]);
      console.log(pos[0]["noUsersVoted"]);
      if (pos[0]["noOfUsers"] == pos[0]["noUsersVoted"]) {
        res.status(500).send("Voting Ended");
      }else{

      

      Position.updateOne(
        { _id: pos[0]["_id"] }, // Filter
        { $set: { noUsersVoted: (pos[0]["noUsersVoted"] += 1) } }, // Update
        { upsert: true } // add document with req.body._id if not exists
      )
        .then((obj) => {
          console.log("Updated Position COunts.");
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
        cand(x)
    }});
   
  });

  return res.status(200).send({"message":"You Have voted!!"});
};

function cand(x){
  Candidate.find({
    user: x.candidate.id,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    //   console.log(user);
    Candidate.updateOne(
      { _id: user[0]["_id"] }, // Filter
      { $set: { points: (user[0]["points"] += 1) } }, // Update
      { upsert: true } // add document with req.body._id if not exists
    )
      .then((obj) => {
        console.log("Updated Candidates votes.");
       
        
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  });
}
