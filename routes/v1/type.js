var express = require('express');
var router = express.Router();
let TypeModel = require('../../models/typeModel.js');


router.get('/', (req, res) => {
  TypeModel
    .find()
    .then((types) => {
      res.json(types);
    });
})

// コーヒーの種類登録
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
  let Id = req.params.id;
  TypeModel
    .findById(Id, (err, type) => {
      if(err) {
        res.send(err);
      } else {
        // POSTパラメータに設定されていない項目は現状維持
        type.id = req.body.id || type.id;
        type.name = req.body.name || type.name;
        type.price = req.body.price || type.price;

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

// IDごとのユーザー情報の削除
router.delete('/:id', function(req, res, next) {
  let Id = req.params.id;
  TypeModel.remove({_id:Id})
    .then(() => {
      res.json({message: 'Success!!'});
    });
});

module.exports = router;
