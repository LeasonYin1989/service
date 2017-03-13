const azure = require('azure-storage');
const serviceManager = require('./serviceManager');
const config = require('./config');

function getStorageProps(targetService) {
    const accountName = serviceManager[targetService][config.region][config.level].storageName;
    const accountKey = serviceManager[targetService][config.region][config.level].storageKey;
	const connection="DefaultEndpointsProtocol=https;AccountName=stroageservice;AccountKey=0DkZ+mgsije5hY3t+WeC+0NDWU45qCUt/92CNgxdLO2aE0NgA84jJCBtKRSyNh/L+qzhkgzmuvX1wLwvQvG5ug==;EndpointSuffix=core.chinacloudapi.cn";
    return {
        accountName: accountName,
        accountKey: accountKey,
        partitionKey: serviceManager[targetService][config.region][config.level].partitionKey,
        tableName: serviceManager[targetService][config.region][config.level].tableName,
        targetService: targetService,
        tableSvc: azure.createTableService(connection)
    }
}

module.exports = getStorageProps;