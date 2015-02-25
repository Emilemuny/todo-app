'use strict';

var expect = require('chai').expect;
var Items = require('../../server/models/item');
var Users = require('../../server/models/user');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var server = require('../../server/index');
var cookie;


describe('get /items?filter&value', function() {
  it('should filter by one tag', function(done) {
    var options = {
      method: "get",
      url: "/items?filter=tags&value=html",
      header: {
        cookie: cookie
      },
    };
    Items.find({tags:"html"}, function(err, items) {
      expect(items).to.be.ok;

      console.log(items);
    });
    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

});
