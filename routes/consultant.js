// Consultant routes implement express functions for manipulating project data
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Consultant = require('../models/Consultant.js');

/* GET ALL CONSULTANTS */
router.get('/', function(req, res, next) {
  Consultant.find(function (err, consultant) {
    if (err) return next(err);
    res.json(consultant);
  });
});

/* GET SINGLE CONSULTANT BY ID */
router.get('/:id', function(req, res, next) {
  Consultant.findById(req.params.id, function (err, consultant) {
    if (err) return next(err);
    res.json(consultant);
  });
});

/* UPDATE CONSULTANT */
router.put('/:id', function(req, res, next) {
  Consultant.findByIdAndUpdate(req.params.id, req.body, function (err, consultant) {
    if (err) return next(err);
    res.json(consultant);
  });
});

/* CREATE CONSULTANT */
router.post('/create', function(req, res, next) {
  var obj = req.body;
  var model = new Consultant(obj);
  model.save(function(err) {
    if (err) {
      res.send("error");
      return;
    }
    res.send("created");
  });
});

/*ADD NEW PROFICIENCY */
router.patch('/:id', function(req, res, next) {
  var newProficiency = {
    "language": "",
    "writing": 1,
    "speaking": 1,
    "listening": 1,
    "reading": 1
  };

  Consultant.findByIdAndUpdate({ _id: req.params.id },
                              {$push: { proficiencies: newProficiency }},
                              function (err, consultant) {
    if (err) return next(err);
    res.json(consultant);
  });
});

/*REMOVE PROFICIENCY*/
router.delete('/:id/proficiencies/:proficiencyId', function(req, res, next) {
  var proficiencyId = req.params['proficiencyId'];
  Consultant.findByIdAndUpdate({ _id: req.params.id },
                    {$pull : {proficiencies : {_id: proficiencyId } } },
                              function (err, consultant) {
      if (err) return next(err);
      res.json(consultant);
  });
})

module.exports = router;
