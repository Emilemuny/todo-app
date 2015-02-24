'use strict';

var expect = require('chai').expect;
var User = require('../../server/models/user');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;

require('../../server/index');

describe('User', function(){
  beforeEach(function(done){
    User.remove(function(){
      var user = new User({email:'bob@aol.com', password:'123'});
      user.save(done);
    });

  });
  describe('.register', function(){
    it('should register a user', function(done){
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

    it('should NOT register a user - duplicate email', function(done){
      User.register({email:'bob@aol.com',password:'123'}, function(err, user) {
        expect(err).to.be.ok;
        expect(user).to.not.be.ok;
        done();
      });
    });
  });

  describe('.authenticate',function(){
    it('should auntenticate a user', function(done){
      User.authenticate({email:'sam@aol.com', password:'123'}, function(err, user){
        expect(err).to.not.be.ok;
        expect(user.email).to.equal('sam@aol.com');
        expect(user.password).to.equal('123');
        expect(user).to.be.ok;
        done();
      });

    });
  });
});
// describe('User', function(){
//   beforeEach(function(done){
//     User.remove(function(){
//       var user = new User({email:'sam@aol.com', password:'123'});
//       user.save(done);
//     });
//   });



// });
