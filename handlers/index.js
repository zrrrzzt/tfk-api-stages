'use strict';

var mongojs = require('mongojs');
var helpers = require('../helpers');
var config = require('../config');
var db = mongojs(config.DB);
var stages = db.collection('stages');

function getStage(request, reply) {
  var id = mongojs.ObjectId(request.params.stageId);
  stages.find({_id: id}, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function getStages(request, reply) {
  var skipNum = request.query.skip ? parseInt(request.query.skip, 10):0;
  var limitNum = request.query.limit ? parseInt(request.query.limit, 10):20;
  stages.find({}).skip(skipNum).limit(limitNum, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function searchStages(request, reply) {
  stages.find({'$text':{'$search':request.params.searchText}}, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

module.exports.getStage = getStage;

module.exports.getStages = getStages;

module.exports.searchStages = searchStages;
