'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: String,
  password: String,
  idm: String
});

module.exports = mongoose.model('UserModel', UserSchema);
