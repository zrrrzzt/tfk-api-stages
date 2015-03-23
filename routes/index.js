'use strict';

var handlers = require('../handlers');
var routes = [
  {
    method: 'POST',
    path: '/forms/templates',
    handler: handlers.addTemplate
  },
  {
    method: 'GET',
    path: '/forms/template/{templateId}',
    handler: handlers.getTemplate
  },
  {
    method: 'PUT',
    path: '/forms/template/{templateId}',
    handler: handlers.updateTemplate
  },
  {
    method: 'DELETE',
    path: '/forms/template/{templateId}',
    handler: handlers.deleteTemplate
  },
  {
    method: 'GET',
    path: '/forms/templates',
    handler: handlers.getTemplates
  },
  {
    method: 'POST',
    path: '/forms',
    handler: handlers.addForm
  },
  {
    method: 'GET',
    path: '/form/{formId}',
    handler: handlers.getForm
  },
  {
    method: 'PUT',
    path: '/form/{formId}',
    handler: handlers.updateForm
  },
  {
    method: 'DELETE',
    path: '/form/{formId}',
    handler: handlers.deleteForm
  },
  {
    method: 'GET',
    path: '/forms',
    handler: handlers.getForms
  }
];

module.exports = routes;