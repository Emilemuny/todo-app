'use strict';

var mongoose = require('mongoose');


var itemSchema = mongoose.Schema({
  title: {type: String, required: true},
  dueDate: {type: Date, required: true},
  tags: [String],
  priority: {type: String, required: true},
  createdAt: {type:Date, default: Date.now},
  isCompleted: {type: Boolean, default: false},
  userId: {type: mongoose.Schema.ObjectId, ref: 'User', required: true}
});


itemSchema.pre('save', function(next) {
  this.tags = this.tags[0].split(',').map(function(s) {return s.trim().toLowerCase();});
  next();
});

module.exports = mongoose.model('Item', itemSchema);

// itemSchema.statics.createItem = function(payload, cb) {
//
//   payload.tags = payload.tags.split(",");
//   var item = new Item(payload);
//   item.save(cb);
// }


// Item = mongoose.model('Item', itemSchema);
// module.exports = Item;
