'use strict';

var expect = require('chai').expect;
var User = require('../../server/models/user');
var Item = require('../../server/models/item');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var Joi = require('joi');
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;

var server = require('../../server/index');

describe('User', function() {
  beforeEach(function(done) {
    User.remove(function() {
      var user = new User({email:'bob@aol.com', password:'123'});
      User.register(user,done);
    });

  });
  describe('.register', function() {
    it('should register a user', function(done) {
      User.register({email:'sam@aol.com',password:'123'}, function(err, user) {

        expect(err).to.not.be.ok;
        expect(user.email).to.equal('sam@aol.com');
        expect(user.password).to.have.length(60);
        expect(user.createdAt).to.be.instanceof(Date);
        expect(user._id).to.be.ok;
        expect(user).to.be.ok;
        done();
      });
    });

    it('should NOT register a user - duplicate email', function(done) {
      User.register({email:'bob@aol.com',password:'123'}, function(err, user) {
        expect(err).to.be.ok;
        expect(user).to.not.be.ok;
        done();
      });
    });
  });

  describe('.authenticate', function() {
    it('should authenticate a user', function(done) {
      User.authenticate({email: 'bob@aol.com', password: '123'}, function(err, user) {
        expect(err).to.not.be.ok;
        expect(user.email).to.equal('bob@aol.com');
        expect(user).to.be.ok;
        done();
      });
    });

  });

  it('should NOT authenticate a user - bad email', function(done) {
    User.authenticate({email:'bad@aol.com', password:'123'}, function(err, user) {

      expect(err).to.be.ok;
      expect(user).to.not.be.ok;
      done();
    });

  });

  describe('.authenticate', function() {
    it('should auntenticate a user is empty', function(done) {
      User.authenticate({email:'', password:''}, function(err, user) {
        expect(err).to.be.ok;
        //expect(user.email).to.equal('');
        //expect(user.password).to.equal('');
        //expect(user.password).to.have.length(0);
        //  expect(user.createdAt).to.be.instanceof(Date);
        //expect(user.password).to.equal('123');
        expect(user).to.not.be.ok;
        done();
      });

    });
  });
  describe('.createItem', function() {
    it('should create a new Item', function(done) {
      Item.createItem({title:'thetitle', dueDate: Date(), tags: 'dinosaurs,apps', priority:'High'}, function(err, item) {
        expect(err).to.not.be.ok;
        expect(item.title).to.equal('thetitle');
        expect(item.dueDate).to.be.instanceof(Date);
        expect(item.tags).to.be.instanceof(Array);
        expect(item.priority).to.equal('High');
        done();
      });
    });
    it('should NOT create a new Item - empty title', function(done) {
      Item.createItem({title:'', tags:'dinosaurs,apps', priority:'High'}, function(err, item) {
        expect(err).to.be.ok;
        expect(item).to.not.be.ok;
        // expect(item.title).to.equal('');

        done();
      });
    });
  });


});
