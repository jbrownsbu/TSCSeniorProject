// Project routes implement express functions for manipulating project data
var express = require('express');
var router = express.Router();
var Project = require('../models/Project.js');

// GET ALL PROJECTS
router.get('/', function(req, res, next) {
  Project.find(function (err, projects) {
    if (err) return next(err);
    res.json(projects);
  });
});

// GET SINGLE PROJECT BY ID
router.get('/:id', function(req, res, next) {
  Project.findById(req.params.id, function (err, project) {
    if (err) return next(err);
    res.json(project);
  });
});

// UPDATE PROJECT
router.put('/:id', function(req, res, next) {
  Project.findByIdAndUpdate(req.params.id, req.body, function (err, project) {
    if (err) return next(err);
    res.json(project);
  });
});

module.exports = router;
