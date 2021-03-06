const express = require('express');
const router = express.Router();
const template = require('.');

router.get('/', function(req, res, next){
  res.marko(template, {
    start: req.query.start,
    offset: req.query.offset,
    q: req.query.q,
    order: req.query.order
  });
});

module.exports = router;
