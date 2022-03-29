const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Position = db.positions;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const StudentClass = db.studentclass;

exports.getClasses = (req, res) => {
  StudentClass.find({
    status: true,
  }).exec((err, studentclass) => {
    if (err) {
      res.status(500).send({ message: err });
    }
    pos = studentclass.map((studentclass) => {
      return studentclass;
    });
    res.status(200).send( pos);
  });
};


exports.explicitgetPostion = (req, res) => {
  Position.find({}).exec((err, position) => {
    if (err) {
      res.status(500).send({ message: err });
    }
    pos = position.map((pos) => {
      return pos;
    });
    res.status(200).send({ positions: pos });
  });
};
exports.createClass = (req, res) => {
  console.log("here");
  const studentclass = new StudentClass({
    name: req.body.name
  });

  studentclass.save((err, position) => {
    if (err) {
      res.status(500).send({ message: err });
    }
    studentclass.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      res
        .status(200)
        .send({
          message: "Class created successfully",
          token: req.headers["x-access-token"],
        });
    });
  });

};

exports.updateStatus = (req, res) => {
  Position.updateOne(
    { _id: req.body._id }, // Filter
    { $set: { status: req.body.status } }, // Update
    { upsert: true } // add document with req.body._id if not exists
  )
    .then((obj) => {
      return res.status(200).send({ message: "Updated Position Status." });
    })
    .catch((err) => {
      res.status(500).send({ error: err });
    });
};

exports.deletePosition = (req, res) => {
  console.log(req.body);
  Position.deleteOne({ _id: req.body._id }, (err, deletedres) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      console.log(deletedres);
      res.status(200).send({ message: "Postion  Deleted Succesfully." });
    }
  });
};
