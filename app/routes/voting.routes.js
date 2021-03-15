const { authJwt ,verifySignUp,verifyCandidate} = require("../middlewares");
const candidateController = require("../controllers/candidate.controller");
const votingController = require("../controllers/vote.controller")
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/candidates", candidateController.getCandidates);

  // app.post("/api/new/candidate",[authJwt.verifyToken,authJwt.isAdmin,verifyCandidate.checkForExistingUserandSamePostion],candidateController.createCandidate);
  app.post("/api/new/candidate",[verifyCandidate.checkForExistingUserandSamePostion],candidateController.createCandidate);

  app.post("/api/vote/new-vote",[authJwt.verifyToken,authJwt.isStudent],votingController.newVote);

};