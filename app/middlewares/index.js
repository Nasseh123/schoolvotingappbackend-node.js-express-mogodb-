const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyPosition= require("./verifyPosition")
const verifyCandidate=require('./verifyCandidate')
const currentUser=require('./currentuser')
const verifyclass=require('./verifyClass')
module.exports = {
  authJwt,
  verifySignUp,
  verifyPosition,
  verifyCandidate,
  currentUser,
  verifyclass
};