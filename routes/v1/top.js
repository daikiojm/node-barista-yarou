'use strict';
const express = require('express');
const moment = require('moment');
let router = express.Router();
let config = require('../../config/service.json');

// host/api/v1/top
router.get('/', function(req, res, next) {
  let pageData = {
    title: config.service_name,
    subtitle: 'Admin',
    menu: true
  }
  res.render('top', pageData);
});

module.exports = router;
