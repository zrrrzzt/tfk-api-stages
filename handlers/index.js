'use strict';

var mongojs = require('mongojs');
var Wreck = require('wreck');
var querystring = require('querystring');
var helpers = require('../helpers');
var config = require('../config');
var db = mongojs(config.DB);
var stages = db.collection('stages');

function handleReply(err, data, request, reply) {
  if (err) {
    console.error(err);
    reply(err);
  } else {
    reply(JSON.parse(data));
  }
}

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

function getClosestStage(request, reply){
  var x = parseInt(request.query.x, 10);
  var y = parseInt(request.query.y, 10);
  var coordinates = '(x=' + x + ',y=' + y +')';
  var proposals = request.query.proposals ? parseInt(request.query.proposals, 10):1;
  var maxdistance = request.query.maxdistance ? parseInt(request.query.maxdistance, 10):3000;
  var qs = {
    proposals: proposals,
    maxdistance: maxdistance,
    coordinates: coordinates
  };
  var url = config.stagesApiUrl + '/Place/GetClosestStops' + '?' + querystring.stringify(qs);
  var options = {
    headers: {
      'Accept':'application/json'
    }
  };

  Wreck.get(url, options, function(err, res, payload){
    handleReply(err, payload, request, reply);
  });

}

function getTravelRoute(request, reply){
  var fromplace = request.query.fromplace;
  var toplace = request.query.toplace;
  var proposals = request.query.proposals ? parseInt(request.query.proposals, 10):1;
  var isafter = request.query.isafter ? request.query.isafter : true;
  var time = request.query.time ? request.query.time : new Date().toISOString();
  var qs = {
    toplace: toplace,
    fromplace: fromplace,
    proposals: proposals,
    isafter: isafter,
    time: time
  };
  var url = config.stagesApiUrl + '/Travel/GetTravels' + '?' + querystring.stringify(qs);
  var options = {
    headers: {
      'Accept':'application/json'
    }
  };

  Wreck.get(url, options, function(err, res, payload){
    handleReply(err, payload, request, reply);
  });

}

module.exports.getStage = getStage;

module.exports.getStages = getStages;

module.exports.searchStages = searchStages;

module.exports.getClosestStage = getClosestStage;

module.exports.getTravelRoute = getTravelRoute;