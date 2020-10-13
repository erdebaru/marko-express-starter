const express = require('express');
const router = express.Router();
const template = require('./');

router.get('/', function(req, res, next){
  res.marko(template)
});

module.exports = router;
