const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config.js');
const parser = require('../parser.js');
const isValid = require('../validate.js');
const constants = require('../constants.js');
const appInsights = require('applicationinsights');
const analytics = require('../analytics');
const storeData = require('../storage.js');
const serviceManager = require('../serviceManager');
const getStorageProps = require('../storagePropsRetriever');
const reportGenerator = require('../reportGenerator');
const getTokenInfo = require('../getTokenInfo');
const envConfig = config[config.region][config.level];

// Initialize App Insights Client
var appInsightsClient = appInsights.getClient(envConfig.appinsightsKey);

/*
    Storage Service
    path: /storageservice/{targetservice}
*/
router.storageService = function(req, res, next) {    
  	const eventName = constants.storageService;
    var analyticsProps = {};

    // Validate API Key
    const apiKey = req.headers[constants.storageApiKeyHeader];
    if(!isValidApiKey(apiKey)) {
        analyticsProps = analytics.createFailureAnalytic(analyticsProps, constants.invalidApiKey, constants.HTTP_STATUS_UNAUTHORIZED);
        respond(res, eventName, constants.HTTP_STATUS_UNAUTHORIZED, analyticsProps);
        return;
    }

    // Validate Target Service
    const targetService = req.params.service;
    if(!isValidTargetService(targetService)) {
        analyticsProps = analytics.createFailureAnalytic(analyticsProps, constants.invalidTargetService, constants.HTTP_STATUS_NOT_FOUND);
        respond(res, eventName, constants.HTTP_STATUS_NOT_FOUND, analyticsProps);
        return;
    }    

    const clientData = parser.parseClientData(targetService, req.headers, req.body);   

    // Create Default Analytics Properties    
    analyticsProps = analytics.initializeAnalytics(clientData, targetService);
    
    // Validate Request Parameters
    if(isValid(clientData, targetService)) {
        if (serviceManager[targetService].storePublicID) {
            getTokenInfo(clientData[constants.accessTokenHeader]).then(function(value) {
                var tokenInfo = JSON.parse(value);
                clientData[constants.public_id] = tokenInfo.user_id;                
                return clientData;
            }).then(function(clientData) {
                storeInTable(clientData, targetService, { res: res, analyticsProps: analyticsProps });
            }).catch(function (error) {                               
                analyticsProps = analytics.createFailureAnalytic(analyticsProps, error, constants.HTTP_STATUS_BAD_REQUEST);
                respond(res, eventName, constants.HTTP_STATUS_BAD_REQUEST, analyticsProps);                
            });
        } else {
            storeInTable(clientData, targetService, { res: res, analyticsProps: analyticsProps });
        }
    } else {
        analyticsProps = analytics.createFailureAnalytic(analyticsProps, constants.invalidRequestParameters, constants.HTTP_STATUS_BAD_REQUEST);
        respond(res, eventName, constants.HTTP_STATUS_BAD_REQUEST, analyticsProps);
    }
};

function storeInTable(clientData, targetService, props) {    
    const storageProps = getStorageProps(targetService);
    storeData(clientData, storageProps).then(function(result) {
        respond(props.res, constants.storageService, constants.HTTP_STATUS_OK, props.analyticsProps);
    }).catch(function (error) {         
        props.analyticsProps = analytics.createFailureAnalytic(props.analyticsProps, error);
        res.json({"status":-1,"msg":error});
		return;
    });
}

function isValidTargetService(targetService) {
    if(!targetService || !serviceManager[targetService]) {
        return false;
    }
    return true;
}

/*
    Send Reports API
    path: /sendReports
*/
router.sendReports = function(req, res, next) {
    const eventName = constants.reportGenerator;
    const apiKey = req.headers[constants.storageApiKeyHeader];
    var analyticsProps = {};
    
    if(!isValidApiKey(apiKey)) {
        analyticsProps = analytics.createFailureAnalytic(analyticsProps, constants.invalidApiKey, constants.HTTP_STATUS_UNAUTHORIZED);
        respond(res, eventName, constants.HTTP_STATUS_UNAUTHORIZED, analyticsProps);
        return;
    }
    const frequency = reportGenerator.getReportFrequency(req);
    if(frequency) {
        for (key in serviceManager) {
            if(serviceManager.hasOwnProperty(key) && serviceManager[key].reportOptions.generateReport) {
                var targetService = key;                
                if(serviceManager[targetService].reportOptions.frequency === frequency) {
                    reportGenerator.getDataAndSendReport(targetService);
                }
            }
        }
        respond(res, eventName, constants.HTTP_STATUS_OK, { status: constants.success });
    } else {
        respond(res, eventName, constants.HTTP_STATUS_BAD_REQUEST, { status: constants.failure, reason: constants.invalidFrequency });        
    }
}

function isValidApiKey(apiKey) {
    if(apiKey === config.storageApiKey) {
        return true;
    }
    return false;
}

function respond(res, eventName, statusCode, analyticsProps) {
    appInsightsClient.trackEvent(eventName, analyticsProps);
    res.status(statusCode).json();
}

module.exports = router;