'use strict';

var mongojs = require('mongojs');
var helpers = require('../helpers');
var config = require('../config');
var db = mongojs(config.DB);
var forms = db.collection('forms');
var templates = db.collection('formtemplates');

function addTemplate(request, reply) {
  templates.save(request.payload, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function getTemplate(request, reply) {
  var id = mongojs.ObjectId(request.params.templateId);
  templates.find({_id: id}, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function updateTemplate(request, reply) {
  var id = mongojs.ObjectId(request.params.templateId);
  templates.update({_id:id}, request.payload, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function deleteTemplate(request, reply) {
  var id = mongojs.ObjectId(request.params.templateId);
  templates.remove({_id: id}, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function getTemplates(request, reply) {
  templates.find({}, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function addForm(request, reply) {
  forms.save(request.payload, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function getForm(request, reply) {
  var id = mongojs.ObjectId(request.params.formId);
  forms.find({_id:id}, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function updateForm(request, reply) {
  var id = mongojs.ObjectId(request.params.formId);
  forms.update({_id:id}, request.payload, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function deleteForm(request, reply) {
  var id = mongojs.ObjectId(request.params.formId);
  forms.remove({_id: id}, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function getForms(request, reply) {
  forms.find({}, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

module.exports.addTemplate = addTemplate;

module.exports.getTemplate = getTemplate;

module.exports.updateTemplate = updateTemplate;

module.exports.deleteTemplate = deleteTemplate;

module.exports.getTemplates = getTemplates;

module.exports.addForm = addForm;

module.exports.getForm = getForm;

module.exports.updateForm = updateForm;

module.exports.deleteForm = deleteForm;

module.exports.getForms = getForms;