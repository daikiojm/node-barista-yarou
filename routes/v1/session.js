'use strict';
const express = require('express');
let router = express.Router();
let UserModel = require('../../models/userModel.js');
let config = require('../../config/service.json');

// host/api/v1/login
router.get('/login', (req, res, next) => {
  let pageData = {
    title: config.service_name,
    subtitle: 'ログイン',
    menu: false
  }
  if (req.session.user_id) {
    if (req.session.isadmin) {
      res.redirect('/api/v1/top');
    } else {
      let url = '/api/v1/usersummary/' + req.session.user_id;
      res.redirect(url)
    }
  } else {
    res.render('login', pageData);
  }
});

// ユーザー登録ページの表示
router.get('/register', (req, res) => {
  let pageData = {
    title: config.service_name,
    subtitle: 'ユーザー登録',
    menu: false
  }
  res.render('useradd', pageData);
});

// ログイン
// host/api/v1/login
router.post('/login', (req, res, next) => {
  // 簡単なバリデーション
  if (!req.body.username || !req.body.password) {
    res.redirect('/api/v1/login');
  }
  let query = {
    username: req.body.username,
    password: req.body.password // sha1などで暗号化するのがベター
  }
  console.log(query);
  UserModel.find(query, (err, data) => {
    if (err) {
      // エラー発生時
      console.log(err);
      res.send('/api/v1/login');
    }
    if (data.length > 0) {
      // ログイン成功時
      req.session.user_id = data[0]._id;
      req.session.isadmin = data[0].isadmin;
      if (req.session.isadmin) {
        res.send('/api/v1/top');
      } else {
          let url = '/api/v1/usersummary/' + req.session.user_id;
          console.log(url);
          res.send(url);
      }
    }
    else {
      // ログイン失敗時
      res.send('/api/v1/login');
    }
  });
});

// ログアウト
// host/api/v1/logout
router.post('/logout', (req, res) => {
  if (req.session.user_id) {
    delete req.session.user_id;
    res.json({ message: 'Success'});
  } else {
    res.json({ message: 'Failed'});
  }
});

// 新規ユーザーの登録
router.post('/user', (req, res, next) => {
  let User = new UserModel();
  User.username = req.body.username;
  User.password = req.body.password;
  User.idm = req.body.idm;
  User.isadmin = req.body.isadmin || false; // 隠しパラメータ
  User.save((err) => {
    if(err) {
      res.send(err);
    } else {
      res.json({ message: 'Success'});
    }
  });
});

module.exports = router;
