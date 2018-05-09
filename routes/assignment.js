// Assignment routes implement express functions for manipulating project data
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Assignment = require('../models/Assignment.js');

/* GET ALL ASSIGNMENTS*/
router.get('', function(req, res, next) {
  Assignment.find(function (err, assignment) {
    if (err) return next(err);
    res.json(assignment);
  });
});

/* GET ALL ASSIGNMENTS FOR A CONSULTANT*/
router.get('/consultant/:consultantId', function(req, res, next) {
  Assignment.find({ consultantId: req.params.consultantId }, function (err, assignment) {
    if (err) return next(err);
    res.json(assignment);
  });
});

/* GET ALL ASSIGNMENTS FOR A PROJECT*/
router.get('/project/:projectId', function(req, res, next) {
  Assignment.find({ projectId: req.params.projectId }, function (err, assignment) {
    if (err) return next(err);
    res.json(assignment);
  });
});

/* GET SINGLE ASSIGNMENT BY ID */
router.get('/:id', function(req, res, next) {
  Assignment.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE ASSIGNMENT */
router.put('/:id', function(req, res, next) {
  Assignment.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* CREATE ASSIGNMENT */
router.post('/project/:projectId', function(req, res, next) {
  var obj = req.body;
  var model = new Assignment(obj);
  model.save(function(err) {
    if (err) {
      res.send("error");
      return;
    }
    res.send("created");
  });
});


/* DELETE ASSIGNMENT */
router.delete('/:id', function(req, res, next) {
  Assignment.deleteOne({ _id: req.params.id }, function (err, assignment) {
    if (err) return next(err);
    res.json(assignment);
  });
})
module.exports = router;
