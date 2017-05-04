'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
let Schema = mongoose.Schema;

let TypeSchema = new Schema({
  id: Number,
  name: String,
  price: Number
});

module.exports = mongoose.model('TypeModel', TypeSchema);
