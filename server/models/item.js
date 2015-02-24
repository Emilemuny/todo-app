'use strict';

var mongoose = require('mongoose');
var Item;
var Schema = mongoose.Schema;

var itemSchema = mongoose.Schema({
  title: {type: String, required: true},
  dueDate: {type: Date, required: true},
  tags: {type: Array, required: true},
  priority: {type: String, required: true},
  createdAt: {type:Date, default: Date.now, required: true},
  isCompleted: {type: Boolean, default: false},
  userId: Schema.ObjectId
});

itemSchema.statics.createItem = function(payload, cb) {
  payload.tags = payload.tags.split(",");
  var item = new Item(payload);
  item.save(cb);
}


Item = mongoose.model('Item', itemSchema);
module.exports = Item;
