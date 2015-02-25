'use strict';

module.exports = {
  auth: false,
  handler: function(request, reply) {
    console.log("route handler: ",request.headers);
    reply.view('templates/items/new');
  }
};
