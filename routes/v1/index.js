'use strict';
const express = require('express');
let router = express.Router();
let session = require('./session.js');
let user = require('./user.js');
let top = require('./top.js');
let drip = require('./coffee.js');
let type = require('./type.js');
let pasori = require('./pasori.js');
let usersummary = require('./usersummary.js');
let config = require('../../config/service.json');

// check login session
// only administrator
let adminCheck = (req, res, next) => {
  if (req.session.user_id && req.session.isadmin) {
    next();
  } else {
    res.redirect('/api/v1/login');
  }
}

let loginCheck = (req, res, next) => {
  if (req.session.user_id) {
    next();
  } else {
    res.redirect('/api/v1/login');
  }
}

// admin領域
router.use('/top', adminCheck, top);
router.use('/user', adminCheck, user);
router.use('/drip', adminCheck, drip);
router.use('/type', adminCheck, type);

// user領域
router.use('/', session);
router.use('/usersummary', loginCheck, usersummary);

// localhostからのアクセスしか想定しないため認証不要
router.use('/pasori', pasori);

module.exports = router;
