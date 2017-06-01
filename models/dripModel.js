'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
let Schema = mongoose.Schema;

let DripSchema = new Schema({
  user_id: String,
  type: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DripModel', DripSchema);
