'use strict';

var handlers = require('../handlers');
var routes = [
  {
    method: 'GET',
    path: '/stage/{stageId}',
    handler: handlers.getStage
  },
  {
    method: 'GET',
    path: '/stages',
    handler: handlers.getStages
  },
  {
    method: 'GET',
    path: '/stages/search/{searchText}',
    handler: handlers.searchStages
  }
];

module.exports = routes;