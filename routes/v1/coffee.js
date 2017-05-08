var express = require('express');
var router = express.Router();
const moment = require('moment');
let DripModel = require('../../models/dripModel.js');
let TypeModel = require('../../models/typeModel.js');

// ユーザーID、タイプを指定してドリップ
router.post('/', (req, res) => {
  let Drip = new DripModel();
  Drip.user_id = req.body.user_id;
  Drip.type = req.body.type;
  // Drip.setDate();
  Drip.save((err) => {
    if(err) {
      res.send(err);
    } else {
      res.json({ message: 'Success'});
    }
  });
});

// ユーザーID、タイプを指定して全期間の集計結果を取得
router.get('/:id/:type', function(req, res, next) {
  let userId = req.params.id;
  let dripType = req.params.type;
  DripModel.count({user_id: userId, type: dripType}, (err, c) => {
    console.log(c);
    TypeModel.findOne({id: dripType}, (err, docs) => {
      console.log(docs);
      let price = docs.price;
      res.json({
        "count": c,
        "price": c * price
      });
    });
  });
});

// ユーザーID、タイプを指定して指定期間の集計結果を取得
// drip?userid=d_ojima&type=0&since=2017-04-22&until=2017-04-24
router.get('/count', function(req, res, next) {
  let userId = req.query.userid || null;
  if (userId == null) {
    res.json({
      "result": "err",
      "message": "Request parameter is insufficient"
    });
  }
  let dripType = req.query.type || 0;// default: 0(barista)
  let sinceDay = req.query.since || moment.unix(0).format("YYYY-MM-DD");
  let untilDay = req.query.until || moment().format("YYYY-MM-DD");
  // Set the range to select date
  // ref : https://www.quora.com/Node-js-How-do-range-query-in-mongoose
  // 境界値を含む場合: $gte, $lte
  // 境界値を含まない場合: $gt, $lt
  DripModel.count({user_id: userId, type: dripType, "date": {'$gte': new Date(sinceDay), '$lte': new Date(untilDay)}}, (err, c) => {
    console.log(c);
    TypeModel.findOne({id: dripType}, (err, docs) => {
      if (err) {
        res.json({
          "result": "err",
          "message" : err
        });
      }
      console.log(docs);
      let price = docs.price || 0;
      res.json({
        "result": "success",
        "count": c,
        "price": c * price
      });
    });
  });
});

router.get('/', function(req, res, next) {
  let userId = req.query.userid || null;
  if (userId == null) {
    res.json({
      "result": "err",
      "message": "Request parameter is insufficient"
    });
  }
  let dripType = req.query.type || 0;// default: 0(barista)
  let sinceDay = req.query.since || moment.unix(0).format("YYYY-MM-DD");
  let untilDay = req.query.until || moment().format("YYYY-MM-DD");

  let query = {
    user_id: userId,
    date: {'$gte': new Date(sinceDay), '$lte': new Date(untilDay)}
  }
  if (false) {
    query.type = dripType;
  }

  DripModel.find(query, (err, docs) => {
    res.json(docs);
  })

});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
