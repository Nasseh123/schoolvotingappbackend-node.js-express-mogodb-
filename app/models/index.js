const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
// db.tutorials = require("./candidates.model.js")(mongoose);

db.user = require("./user.model");
db.role = require("./role.model");
db.positions = require("./positions.model");
db.candidate=require("./candidates.model")

db.ROLES = ["user","student", "admin"];

module.exports = db;