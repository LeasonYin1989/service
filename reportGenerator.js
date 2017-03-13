const express = require('express');
const router = express.Router();
const request = require('request');
const appInsights = require('applicationinsights');
const cron = require('node-schedule');
const config = require('./config');
const constants = require('./constants')
const getData = require('./storageRetriever');
const emailReport = require('./mailer');
const serviceManager = require('./serviceManager');
const getStorageProps = require('./storagePropsRetriever');
const envConfig = config[config.region][config.level];

var appInsightsClient = appInsights.getClient(envConfig.appinsightsKey);

function getDataAndSendReport(targetService) {
    const storageProps = getStorageProps(targetService);  
    getData(storageProps).then(function (tableData) {                                
        var recipients = serviceManager[targetService].reportOptions.recipients;                    
        var props = { targetService: targetService, tableData: tableData, recipients: recipients };
        sendReport(props);              
    }).catch(function (error) {            
        appInsightsClient.trackEvent(constants.reportGenerator, { target: props.targetService, status: constants.failure, reason: error });
    });
}

function sendReport(props) {
    emailReport(props).then(function() {
        appInsightsClient.trackEvent(constants.reportGenerator, { target: props.targetService, status: constants.success });
    }).catch(function (error) {
        appInsightsClient.trackEvent(constants.reportGenerator, { target: props.targetService, status: constants.failure, reason: error });
    });
}

function getReportFrequency(req) {
    if(req.body) {
        var frequency = req.body[constants.frequency];
        if(frequency === constants.daily || frequency === constants.weekly) {
            return frequency;
        }
    }
    return null;
}

module.exports = {
    getReportFrequency: getReportFrequency,
    getDataAndSendReport: getDataAndSendReport
};