// Consultant routes implement express functions for manipulating project data
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Consultant = require('../models/Consultant.js');

/* GET ALL CONSULTANTS */
router.get('/', function(req, res, next) {
  Consultant.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE CONSULTANT BY ID */
router.get('/:id', function(req, res, next) {
  Consultant.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE CONSULTANT */
router.put('/:id', function(req, res, next) {
  Consultant.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
