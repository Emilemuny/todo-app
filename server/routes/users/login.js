'use strict';

module.exports = {
  auth: false,
  handler: function(request, reply) {
    reply.view('templates/users/login');
  }
};
