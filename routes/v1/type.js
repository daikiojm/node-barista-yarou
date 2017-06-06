'use strict';
const express = require('express');
let router = express.Router();
let TypeModel = require('../../models/typeModel.js');
let config = require('../../config/service.json');
let sessionHelper = require('../../lib/sessionhelper.js');

// 全コーヒー種別の表示
router.get('/list', sessionHelper.adminCheck, (req, res) => {
  let pageData = {
    title: config.service_name,
    subtitle: '全コーヒー種別',
  }
  res.render('type', pageData);
});

// コーヒータイプ登録ページの表示
router.get('/add', sessionHelper.adminCheck, (req, res) => {
  let pageData = {
    title: config.service_name,
    subtitle: 'コーヒー種別登録',
  }
  res.render('typeadd', pageData);
});

router.get('/', sessionHelper.adminCheck, (req, res) => {
  TypeModel
    .find()
    .then((types) => {
      res.json(types);
    });
})

// コーヒーの種類登録
router.post('/', sessionHelper.adminCheck, (req, res) => {
  let Type = new TypeModel();
  Type.id = req.body.id;
  Type.name = req.body.name;
  Type.price = req.body.price;
  Type.save((err) => {
    if(err) {
      res.send(err);
    } else {
      res.json({ message: 'Success'});
    }
  });
});


// IDごとのコーヒーの情報変更
router.put('/:id', sessionHelper.adminCheck, (req, res) => {
  let Id = req.params.id;
  TypeModel
    .findById(Id, (err, type) => {
      if(err) {
        res.send(err);
      } else {
        // POSTパラメータに設定されていない項目は現状維持
        // type.id = req.body.id || type.id;
        type.name = req.body.name || type.name;
        type.price = req.body.price || type.price;
        // 保存
        type.save((err) => {
          if(err) {
            res.send(err);
          } else {
            res.json({ message: 'Success'});
          }
        });
      }
    });
});

// IDごとのコーヒー種類情報の削除
router.delete('/:id', sessionHelper.adminCheck, function(req, res, next) {
  let Id = req.params.id;
  TypeModel.remove({_id:Id})
    .then(() => {
      res.json({message: 'Success!!'});
    });
});

module.exports = router;
