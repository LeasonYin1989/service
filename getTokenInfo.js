const request = require('request');
const config = require('./config.js');
const envConfig = config[config.region][config.level];
const constants = require('./constants');

function getTokenInfo(tokenHeader) {
    var endpoint = envConfig.gcdm.concat(envConfig.tokenInfoUrl);
    var accessToken = (tokenHeader && tokenHeader.split(" ")[1]) ? tokenHeader.split(" ")[1] : null;
    return new Promise(function(resolve, reject) {
        request({
            url: endpoint,
            qs: { access_token: accessToken },
            method: 'GET'
        }, function(error, response, body) {
            if (response.statusCode != constants.HTTP_STATUS_OK) {
                return reject(JSON.parse(body).error + ": " + JSON.parse(body).error_description);
            }
            resolve(body);
        });
    });
}

module.exports = getTokenInfo;