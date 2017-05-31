var express = require('express');
var router = express.Router();
let UserModel = require('../../models/userModel.js');

// host/api/v1/login
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'バリスタ野郎 β' });
});

// ユーザー登録ページの表示
router.get('/user/register', (req, res) => {
  res.render('useradd', { title: 'ユーザー登録' });
});

// host/api/v1/login
router.post('/login', function(req, res, next) {
  // 簡単なバリデーション
  if (!req.body.username || !req.body.password) {
    res.redirect('/api/v1/login');
  }
  let query = {
    username: req.body.username,
    password: req.body.password // sha1などで暗号化するのがベター
  }
  console.log(query);
  UserModel.find(query, function(err, data) {
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
        res.send('/api/v1');
      } else {
          let url = '/api/v1/drip/list/' + req.session.user_id;
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

// host/api/v1/logout
router.post('/logout', function(req, res) {
  delete req.session.user_id;
  // res.redirect('/');
  res.json({ message: 'Success'});
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
