var express = require('express');
var router = express.Router();
let TypeModel = require('../../models/typeModel.js');


router.get('/', (req, res) => {
  res.send('moge');
})

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

module.exports = router;
