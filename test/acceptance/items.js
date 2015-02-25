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
var cookie;

var item;
var bob;


describe('items', function() {
  beforeEach(function(done) {
    User.remove(function() {
      User.register({email:'bob@aol.com', password:'123'}, function() {
        var options = {
          method:'post',
          url:'/users/authenticate',
          payload:{
            email:'bob@aol.com',
            password:'123'
          }
        };
        server.inject(options, function(response){
          cookie = response.headers['set-cookie'][0].match(/project-cookie=[^;]+/)[0];
          Item.remove(function() {
            User.findOne({email:'bob@aol.com'}, function(err, user) {
              if (err) { console.log("ERROR: " + err); }
              bob = user;
              item = new Item({title:'thetitle', dueDate: '2009-11-03', tags: 'dinosaurs,apps', priority:'High', userId: bob._id});
              item.save(done);
            });
          });
        });
      });
    });
  });

  describe('get /items/new', function() {
   it('should display the new item page', function(done) {
     var options = {
       method:'get',
       url:'/items/new',
       headers: {
         cookie: cookie
       }
     };
     console.log("options",options);
     server.inject(options, function(response) {
       expect(response.statusCode).to.equal(200);
       expect(response.payload).to.include('New Item');
       done();

     });
   });
  });
  describe('get /items/id', function() {
  
    it('should display update item page', function(done) {
      console.log("***************");
      console.log(item);
      var options = {
        method: 'post',
        url:'/items/'+item._id,
        headers: {
          cookie: cookie
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.payload).to.include('Update');
        done();
      });
    })
  });
});
    // describe('get /items/'+bob._id+'/completed', function() {
    //   it('should display update item page', function(done) {
    //     var options = {
    //       method: 'get',
    //       url:'/items/'+bob._id,
    //       headers: {
    //         cookie: cookie
    //       }
    //     };
    //     server.inject(options, function(response) {
    //       expect(response.statusCode).to.equal(200);
    //       expect(response.payload).to.include('Update');
    //       done();
    //     });
    //   })
    // });
