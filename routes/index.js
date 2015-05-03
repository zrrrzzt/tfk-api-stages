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
      'description':'Get closest stage. Required params: x, y (east, north UTM32). Optional params: maxdistance (default 3000) and proposals (default 1)'
    }
  },
  {
    method: 'GET',
    path: '/stages/travel',
    handler: handlers.getTravelRoute,
    config: {
      'description':'Get route between 2 stages. Required params: fromplace, toplace. Optional params: isafter (true if after time), time (ddmmYYYY) and proposals (default 1)'
    }
  }
];

module.exports = routes;