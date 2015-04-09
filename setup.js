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
var setupCounter = 0;
var setupJobs = 2;

function isSetupFinished() {
  setupCounter++;
  if (setupCounter === setupJobs) {
    console.log('Setup finished!');
    process.exit();
  }
}

function handleCallback(error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log('Action performed');
    console.log(data);
    isSetupFinished();
  }
}

function addDocument(options, callback) {
  var collection = db.collection(options.collection);

  var document = options.document;
  document._id = mongojs.ObjectId(document._id);

  collection.insert(document, function(err, data){
    if (err) {
      return callback(err, null);
    } else {
      return callback(null, data);
    }
  });
}

stages.ensureIndex(textIndexFields, {"default_language": "nb"}, function(err, data){
  if (err) {
    console.error(err);
  } else {
    console.log('TextIndex OK');
    console.log(data);
    isSetupFinished();
  }
});

addDocument({collection:'stages', document:stagesDocument}, handleCallback);
