// Assignment routes implement express functions for manipulating project data
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Assignment = require('../models/Assignment.js');

/* GET ALL ASSIGNMENTS FOR A CONSULTANT*/
router.get('/consultant/:consultantId', function(req, res, next) {
  Assignment.find({ consultantId: req.params.consultantId }, function (err, products) {
    if (err) return next(err);
    res.json(products);
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
router.post('/:id', function(req, res, next) {
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

module.exports = router;
