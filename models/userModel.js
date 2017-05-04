'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: String,
  screen_name: String,
  bio: String
});

module.exports = mongoose.model('UserModel', UserSchema);
