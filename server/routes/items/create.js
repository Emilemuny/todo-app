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
    request.payload.userId = request.auth.credentials._id;
    console.log("**************");
    console.log(request.payload.userId);
    var item = new Item(request.payload);
    item.save(function() {
      reply.redirect('/items');
    });
  }
};
