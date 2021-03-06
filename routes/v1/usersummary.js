'use strict';
const express = require('express');
const moment = require('moment');
let router = express.Router();
let DripModel = require('../../models/dripModel.js');
let TypeModel = require('../../models/typeModel.js');
let config = require('../../config/service.json');
let sessionHelper = require('../../lib/sessionhelper.js');

// ユーザーごとのサマリーの表示
// :id → ユーザーid
router.get('/:id', (req, res) => {
  let userId = req.params.id;
  let sesIsAdmin = req.session.isadmin;
  let sesId = req.session.user_id;
  if (sesIsAdmin == true || userId == sesId) {
    let pageData = {
      title: config.service_name,
      subtitle: 'サマリー',
      menu: true,
      id: userId
    };
    res.render('usersummary', pageData);
  } else {
    let pageData = {
      title: config.service_name,
      subtitle: 'エラー',
      menu: true,
      error: 'ユーザー認証エラー'
    }
    res.render('sessionerror', pageData);
  }
});

module.exports = router;
