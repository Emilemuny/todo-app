'use strict';

var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply) {
    console.log("%%%request&&&");
    console.log(request.query);
    var filter = {userId: request.auth.credentials._id};
    if (request.query.filter) {

      filter[request.query.filter] = request.query.value;
    }
    var sort = request.query.sort || {};
    var skip = request.query.skip || 0;

    Item.find(filter, function(err, results) {
      reply.view('templates/items/index', {items: results});
    });
  }
};
