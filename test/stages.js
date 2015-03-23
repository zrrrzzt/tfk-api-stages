'use strict';

var wreck = require('supertest');
var server = require('../server');
var config = require('../config');

wreck = wreck('http://localhost:' + config.SERVER_PORT);

describe('stages', function() {

  before(function() {
    server.start();
  });

  after(function() {
    server.stop();
  });

  describe('GET /stages', function() {
    it('responds with json', function(done) {
      wreck
        .get('/stages')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /stage/550be6a59cf8030608f4abc8', function() {
    it('responds with json', function(done) {
      wreck
        .get('/stage/550be6a59cf8030608f4abc8')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /stages/search/gamle', function() {
    it('responds with json', function(done) {
      wreck
        .get('/stages/search/gamle')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

});