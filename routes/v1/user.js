'use strict';
const express = require('express');
let router = express.Router();
let UserModel = require('../../models/userModel.js');
let config = require('../../config/service.json');
let sessionHelper = require('../../lib/sessionhelper.js');

// ユーザーリストページの表示
router.get('/list', sessionHelper.adminCheck, (req, res) => {
  let pageData = {
    title: config.service_name,
    subtitle: 'ユーザー一覧',
    menu: true
  }
  res.render('user', pageData);
});


// ユーザーリストの取得
router.get('/', sessionHelper.adminCheck, (req, res) => {
  UserModel.find({}, {__v: 0}, (err, users) => {
    if (!err) {
      res.json(users)
    } else {
      res.json({ message: err});
    }
  })
});

// IDごとのユーザー情報の取得
router.get('/:id', sessionHelper.loginCheck, (req, res) => {
  let Userid = req.params.id;
  UserModel
    .findById(Userid, (err, user) => {
      res.json(user);
    });
});

// IDごとのユーザー情報の変更
router.put('/:id', sessionHelper.loginCheck, (req, res) => {
  let Userid = req.params.id;
  UserModel
    .findById(Userid, (err, user) => {
      if(err) {
        res.send(err);
      } else {
        // POSTパラメータに設定されていない項目は現状維持
        user.username = req.body.username || user.username;
        user.password = req.body.password || user.password;
        user.idm = req.body.idm || user.idm;
        // 保存
        user.save((err) => {
          if(err) {
            res.send(err);
          } else {
            res.json({ message: 'Success'});
          }
        });
      }
    });
});

// IDごとのユーザー情報の削除
router.delete('/:id', sessionHelper.loginCheck, (req, res, next) => {
  let Userid = req.params.id;
  UserModel.remove({_id:Userid})
    .then(() => {
      res.json({message: 'Success!!'});
    });
});

module.exports = router;
