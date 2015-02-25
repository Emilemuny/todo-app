'use strict';

module.exports = {

  handler: function(request, reply) {
    console.log("route handler: ",request.headers);
    reply.redirect('/items');
  }
};
