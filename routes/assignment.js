var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Assignment = require('../models/Assignment');

/* GET ALL ASSIGNMENTS */
router.get('/', function(req, res, next) {
  Assignment.find(function (err, products) {
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
router.put('/:id', function(req, res, next) {
  Assignment.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
