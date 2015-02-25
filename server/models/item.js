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
  if(this.isNew) {}
  this.tags = this.tags[0].split(',').map(function(s) {return s.trim().toLowerCase();});
  }

  next();
});

module.exports = mongoose.model('Item', itemSchema);
