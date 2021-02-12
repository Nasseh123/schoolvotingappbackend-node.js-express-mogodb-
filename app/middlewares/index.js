const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyPosition= require("./verifyPosition")
const verifyCandidate=require('./verifyCandidate')

module.exports = {
  authJwt,
  verifySignUp,
  verifyPosition,
  verifyCandidate
};