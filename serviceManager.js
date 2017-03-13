var glob = require('glob');
var path = require('path');
var serviceManager = {};

glob.sync(__dirname + '/targets/*.js').map(function (file) {
	var config = require(path.resolve(file));
	serviceManager[config.targetName] = config;
});

module.exports = serviceManager;