'use strict';

var expect = require('chai').expect;
var User = require('../../server/models/user');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var server = require('../../server/index');
var cp = require('child_process');
var dbname = process.env.MONGO_URL.split('/')[3];






describe('users', function() {
  beforeEach(function(done) {
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      console.log(err, stdout, stderr);
      done();
    });


  });

  describe('get /register' , function() {
   it('should display the registration page', function(done) {
     var options = {method:'get', url:'/register'};
     server.inject(options, function(response) {
       expect(response.statusCode).to.equal(200);
       expect(response.payload).to.include('Register');
       done();

     });
   });
  });

  describe('get /users' , function() {
    it('should create a new user', function(done) {
      var options = {
        method:'post',
        url:'/users',
        payload: {
         email:'bob@aol.com',
         password:'123'
        }
     };


     server.inject(options, function(response) {
       expect(response.statusCode).to.equal(302);
       expect(response.headers.location).to.equal('/register');
       //expect(response.payload).to.include('Register');
       done();

     });
  });

  it('should NOT create a new user - duplicate email', function(done) {
    var options = {
      method:'post',
      url:'/users',
      payload:{
        email:'bob@aol.com',
        password:'123'
      }
    };
    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(302);
      done();
    });
  });
  it('should NOT create a new user - empty email', function(done) {
    var options = {
      method:'post',
      url:'/users',
      payload:{
        email:'',
        password:'123'
      }
    };
    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  it('should NOT create a new user - empty password', function(done) {
    var options = {
      method: 'post',
      url:'/users',
      payload:{
        email:'bob@aol.com',
        password: ''
      }
    };
    server.inject(options, function(response) {
      expect(response.statusCode).to.equal(400);
      done();
    });
  });

  });

});
