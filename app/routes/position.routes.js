const { verifyPosition,authJwt} = require("../middlewares");

const controller = require("../controllers/position.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/positions", controller.getPostion);
//   app.post("/api/new/positions",[verifyPosition.checkForExistingPostion,authJwt.isUser], controller.createPosition);

  app.post("/api/new/positions",[authJwt.verifyToken,authJwt.isAdmin,verifyPosition.checkForExistingPostion],controller.createPosition);
//  app.get("/api/test/all", controller.allAccess);

//   app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

//   app.get("/api/test/mod",[authJwt.verifyToken, authJwt.isStudent],controller.studentBoard);

//   app.get(
//     "/api/test/admin",
//     [authJwt.verifyToken, authJwt.isAdmin],
//     controller.adminBoard
//   );
};