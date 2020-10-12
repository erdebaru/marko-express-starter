const express = require('express');
const router = express.Router();

router.use('/', require('../pages/route.js'));

module.exports = router;
