// Project routes implement express functions for manipulating project data
var express = require('express');
var router = express.Router();
var Project = require('../models/Project.js');

// GET ALL PROJECTS
router.get('/', function(req, res, next) {
  Project.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

// GET SINGLE PROJECT BY ID
router.get('/:id', function(req, res, next) {
  Project.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// UPDATE PROJECT
router.put('/:id', function(req, res, next) {
  Project.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
