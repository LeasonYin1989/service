const constants = require('./constants');
const serviceManager = require('./serviceManager');

function initializeAnalytics(clientData, targetService) {
    var analyticsProps = {
        target: targetService,
        status: constants.success        
    };
    if(clientData && targetService) {
        serviceManager[targetService].requiredHeaders.map(function (header) {
            if(header.analyticsOptions.pegValue) {
                analyticsProps[header.analyticsOptions.pegAs] = clientData[header.value];
            }
        });
        serviceManager[targetService].requiredKeys.map(function (key) {
            if(key.analyticsOptions.pegValue) {
                analyticsProps[key.analyticsOptions.pegAs] = clientData[key.value];
            }
        });        
    }
    return analyticsProps;
}

function createFailureAnalytic(analyticsProps, error, statusCode) {
    analyticsProps.status = constants.failure;
    analyticsProps.statusCode = statusCode;
    analyticsProps.reason = error;
    return analyticsProps;
}

module.exports = {
    initializeAnalytics: initializeAnalytics,
    createFailureAnalytic: createFailureAnalytic
};