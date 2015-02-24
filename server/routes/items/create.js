'use strict';

var Joi = require('joi');
var Item = require('../../models/item');

module.exports = {
  validate: {
    payload: {
      title: Joi.string().required(),
      dueDate: Joi.date().required(),
      tags: Joi.string().required(),
      priority: Joi.string().required()
    }
  },
  handler: function(request, reply) {
    Item.createItem(request.payload, function(err, item) {
      if (err) {
        reply.redirect('/items/new');
      } else {
        reply.redirect('/items');
      }
    });
  }
}
