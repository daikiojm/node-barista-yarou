var express = require('express');
var router = express.Router();

let session = require('./session.js');
let user = require('./user.js');
let drip = require('./coffee.js');
let type = require('./type.js');
let pasori = require('./pasori.js');

// check login session
// only administrator
let loginCheck = (req, res, next) => {
  // if (req.session.user_id && req.session.isadmin) {
  if (req.session.user_id) {
    next();
  } else {
    res.redirect('/api/v1/login');
  }
}

// host/api/v1/
router.get('/', loginCheck, function(req, res, next) {
  let pageData = {
    title: 'バリスタ野郎 (β)',
    subtitle: 'Admin'
  }
  res.render('index', pageData);
});

router.use('/', session);
router.use('/user', loginCheck, user);
router.use('/drip', loginCheck, drip);
router.use('/type', loginCheck, type);
// localhostからのアクセスしか想定しないため認証不要
router.use('/pasori', pasori);


module.exports = router;
