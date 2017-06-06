'use strict';
const express = require('express');
const moment = require('moment');
let router = express.Router();
let DripModel = require('../../models/dripModel.js');
let TypeModel = require('../../models/typeModel.js');
let config = require('../../config/service.json');
let sessionHelper = require('../../lib/sessionhelper.js');

// 全ドリップ履歴の表示
router.get('/list', sessionHelper.adminCheck, (req, res) => {
  let pageData = {
    title: config.service_name,
    subtitle: 'ドリップ履歴',
    menu: true
  }
  res.render('drip', pageData);
});

// 全ドリップ履歴取得
router.get('/', sessionHelper.adminCheck, (req, res, next) => {
  DripModel.find({}, {__v: 0}, (err, drips) => {
    if (!err) {
      res.json(drips)
    } else {
      res.json({ message: err});
    }
  });
});

// ユーザーID、タイプを指定してドリップ
router.post('/', sessionHelper.loginCheck, (req, res) => {
  let Drip = new DripModel();
  Drip.user_id = req.body.user_id;
  Drip.type = req.body.type;
  Drip.save((err) => {
    if(err) {
      res.send(err);
    } else {
      res.json({ message: 'Success'});
    }
  });
});

// ユーザーID、タイプを指定して全期間の結果を取得
router.get('/list/:id/:type', sessionHelper.loginCheck, (req, res, next) => {
  let userId = req.params.id;
  let dripType = req.params.type;
  // session check
  let sesIsAdmin = req.session.isadmin;
  let sesId = req.session.user_id;
  if (sesIsAdmin == true || userId == sesId) {
    DripModel.find({user_id: userId, type: dripType}, {__v: 0}, (err, drips) => {
      if (!err) {
        res.json(drips)
      } else {
        console.log(err);
        res.json({ message: "ドリップ履歴が見つかりません。" });
      }
    });
  } else {
    res.send({ message: 'ユーザー認証エラー' });
  }
});

// ユーザーID、タイプを指定して全期間の集計結果を取得
router.get('/:id/:type', sessionHelper.loginCheck, (req, res, next) => {
  let userId = req.params.id;
  let dripType = req.params.type;
  // session check
  let sesIsAdmin = req.session.isadmin;
  let sesId = req.session.user_id;
  if (sesIsAdmin == true || userId == sesId) {
    DripModel.count({user_id: userId, type: dripType}, (err, c) => {
      if (!err) {
        console.log(c);
        TypeModel.findOne({id: dripType}, (err, docs) => {
          if (!err) {
            console.log(docs);
            let price = docs.price;
            res.json({
              "count": c,
              "price": c * price
            });
          } else {
            res.json({
              "count": 0,
              "price": 0,
              "message": "ドリップ履歴が見つかりません。"
            });
          }
        });
      } else {
        res.json({
          "count": 0,
          "price": 0,
          "message": "ドリップ履歴が見つかりません。"
        });
      }
    });
  } else {
    res.send({ message: 'ユーザー認証エラー' });
  }
});

// ユーザーID、タイプを指定して指定期間の集計結果を取得
// drip?userid=d_ojima&type=0&since=2017-04-22&until=2017-04-24
router.get('/count', sessionHelper.loginCheck, (req, res, next) => {
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

// IDごとのドリップ情報の削除
router.delete('/:id', sessionHelper.loginCheck, (req, res, next) => {
  let Id = req.params.id;
  DripModel.remove({_id: Id})
    .then(() => {
      res.json({message: 'Success!!'});
    });
});

module.exports = router;
