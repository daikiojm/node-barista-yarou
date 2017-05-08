var express = require('express');
var router = express.Router();
let TypeModel = require('../../models/typeModel.js');


router.get('/', (req, res) => {
  res.send('moge');
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
  let Userid = req.params.id;
  UserModel
    .findById(Userid, (err, user) => {
      if(err) {
        res.send(err);
      } else {
        // POSTパラメータに設定されていない項目は現状維持
        user.username = req.body.username || user.username;
        user.password = req.body.password || user.password;
        user.idm = req.body.idm || user.idm;

        user.save((err) => {
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
  let Userid = req.params.id;
  UserModel.remove({_id:Userid})
    .then(() => {
      res.json({message: 'Success!!'});
    });
});

module.exports = router;
