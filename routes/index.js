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
  },
  {
    method: 'GET',
    path: '/stages/closest',
    handler: handlers.getClosestStage,
    config: {
      'description':'Get closest stage. Required params: x, y (east, north UTM32). Optional params: maxdistance (default 3000) and proposals (defailt 1)'
    }
  }
];

module.exports = routes;