'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
let Schema = mongoose.Schema;

let DripSchema = new Schema({
  user_id: String,
  type: Number,
  date: { type: Date, default: Date.now }
});

// DripSchema.methods.setDate = () => {
//   this.date = moment().format("YYYY-MM-DD HH:mm:ss");
// };

// Implementation of increment
// reference: http://qiita.com/0x50/items/f47b2f59c217a8eeed09
// DripSchema.statics.increment = () => {
//   return this.collection.findOneAndUpdate({
//     id: id,
//   }, {
//     $inc: { count: 1}
//   }, {
//     new: true,
//     upsert: false
//   }, (err, data) => {
//     done(null, data);
//   });
// }

module.exports = mongoose.model('DripModel', DripSchema);
