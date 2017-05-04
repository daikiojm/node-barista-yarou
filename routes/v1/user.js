var express = require('express');
var router = express.Router();
let UserModel = require('../../models/userModel.js');

/* GET users listing. */
router.post('/', (req, res, next) => {
  let User = new UserModel();
  User.name = req.body.name;
  User.screen_name = req.body.screen_name;
  User.bio = req.body.bio;
  User.save((err) => {
    if(err) {
      res.send(err);
    } else {
      res.json({ message: 'Success'});
    }
  });
});

router.get('/', (req, res) => {
  UserModel
    .find()
    .then((users) => {
      res.json(users);
    });
});

router.get('/:id', (req, res) => {
  let Userid = req.params.id;
  UserModel
    .findById(Userid, (err, user) => {
      res.json(user);
    });
});

router.put('/:id', (req, res) => {
  let Userid = req.params.id;
  UserModel
    .findById(Userid, (err, user) => {
      if(err) {
        res.send(err);
      } else {
        user.name = req.body.name || user.name;
        user.screen_name = req.body.screen_name || user.screen_name;
        user.bio = req.body.bio || user.bio;

        user.save((err) => {
          if(err) {
            res.send(err);
          } else {
            res.json({ message: 'Success'});
          }
        })
      }
    })
})

// delete user by id
router.delete('/:id', function(req, res, next) {
  let Userid = req.params.id;
  UserModel.remove({_id:Userid})
    .then(() => {
      res.json({message: 'Success!!'});
    });
});

module.exports = router;
