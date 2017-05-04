var express = require('express');
var router = express.Router();

let user = require('./user.js');
let drip = require('./coffee.js');
let type = require('./type.js');
router.use('/user', user);
router.use('/drip', drip);
router.use('/type', type);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
