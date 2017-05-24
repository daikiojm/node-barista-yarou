var express = require('express');
var router = express.Router();

let user = require('./user.js');
let drip = require('./coffee.js');
let type = require('./type.js');
let pasori = require('./pasori.js');
router.use('/user', user);
router.use('/drip', drip);
router.use('/type', type);
router.use('/pasori', pasori);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
