'use strict';
const express = require('express');
const moment = require('moment');
let router = express.Router();
let DripModel = require('../../models/dripModel.js');
let TypeModel = require('../../models/typeModel.js');
let config = require('../../config/service.json');

// ユーザーごとのサマリーの表示
// :id → ユーザーid
router.get('/list/:id', (req, res) => {
  let userId = req.params.id;
  let sesIsAdmin = req.session.isadmin;
  let sesId = req.session.user_id;
  if (sesIsAdmin == true || userId == sesId) {
    let pageData = {
      title: config.service_name,
      subtitle: 'サマリー',
      id: userId
    };
    res.render('usersummary', pageData);
  } else {
    let pageData = {
      title: config.service_name,
      subtitle: 'エラー',
      error: 'ユーザー認証エラー'
    }
    res.render('sessionerror', pageData);
  }
});

module.exports = router;
