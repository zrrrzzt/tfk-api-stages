'use strict';

var mongojs = require('mongojs');
var config = require('./config');
var db = mongojs(config.DB);
var stages = db.collection('stages');
var stagesDocument = require('./test/data/stages.json');
var textIndexFields = {
  "S_NAME,C,40": "text",
  "S_SHORT_NA,C,5": "text",
  "S_SHORT_N2,C,12": "text"
};

function handleCallback(error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
}

function addDocument(options, callback) {
  var collection = db.collection(options.collection);

  collection.insert(options.document, function(err, data){
    if (err) {
      return callback(err, null);
    } else {
      return callback(null, data);
    }
  });
}

db.createCollection('stages', handleCallback);

stages.ensureIndex(textIndexFields, {"default_language": "nb"}, function(err, data){
  if (err) {
    console.error(err);
  } else {
    console.log(data)
  }
});

addDocument({collection:'stages', document:stagesDocument}, handleCallback);
