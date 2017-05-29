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
  if (req.session.user_id && req.session.isadmin) {
    next();
  } else {
    res.redirect('/api/v1/login');
  }
}

// host/api/v1/
router.get('/', loginCheck, function(req, res, next) {
  res.render('index', { title: 'バリスタ野郎 β' });
});

router.use('/', session);
router.use('/user', loginCheck, user);
router.use('/drip', loginCheck, drip);
router.use('/type', loginCheck, type);
router.use('/pasori', loginCheck,  pasori);


module.exports = router;
