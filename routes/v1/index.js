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
let sessionHelper = require('../../lib/sessionhelper.js');

// admin領域
router.use('/top', sessionHelper.adminCheck, top);
router.use('/user', user);
router.use('/drip', drip);
router.use('/type', type);

// user領域
router.use('/', session);
router.use('/usersummary', sessionHelper.loginCheck, usersummary);

// localhostからのアクセスしか想定しないため認証不要
router.use('/pasori', pasori);

module.exports = router;
