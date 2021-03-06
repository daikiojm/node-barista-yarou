'use strict';
const express = require('express');
let router = express.Router();
let UserModel = require('../../models/userModel.js');
let DripModel = require('../../models/dripModel.js');
let config = require('../../config/service.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// TODO : Slack通知機能

// Idmを指定してドリップ
// ひとまずtypeは固定とする
router.get('/:idm', function(req, res, next) {
  let Idm = req.params.idm;
  let userId = '';
  UserModel
    .find({idm: Idm}, (err, user) => {
      if (err) {
          res.json({ message: err});
      }
      if (user[0] != undefined) {
        userId = user[0]._id;
      }
      let type = 2;
      let Drip = new DripModel();
      Drip.user_id = userId;
      Drip.type = type;
      Drip.save((err) => {
        if(err) {
          res.json({ message: err});
        } else {
          res.json({ message: 'Success'});
        }
      });
    });
});

module.exports = router;
