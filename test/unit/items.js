'use strict';

var expect = require('chai').expect;
var User = require('../../server/models/user');
var Item = require('../../server/models/item');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var server = require('../../server/index');

var bob;

describe('User', function() {
  beforeEach(function(done) {
    User.remove(function() {
      User.register({email:'bob@aol.com', password:'123'}, function(err, user){
        bob = user;
        done();
      });
    });
  });

  describe('constructor', function() {
    it('should create a new Item', function(done) {
      var item = new Item({title:'thetitle', dueDate: '2009-11-03', tags: 'dinosaurs,apps', priority:'High', userId: bob._id});
      item.save(function(err, item) {
        expect(err).to.not.be.ok;
        expect(item.title).to.equal('thetitle');
        expect(item.dueDate).to.be.instanceof(Date);
        expect(item.tags).to.have.length(2);
        expect(item.priority).to.equal('High');
        done();
      });
    });
    it('should NOT create a new Item - empty title', function(done) {
      var item = new Item({title:'', tags:'dinosaurs,apps', priority:'High'});
      item.save(function(err, item) {
        expect(item).to.not.be.ok;
        // expect(item.title).to.equal('');
        done();
      });
    });
  });
});
