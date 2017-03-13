const azure = require('azure-storage');
const serviceManager = require('./serviceManager');
const config = require('./config');

function getStorageProps(targetService) {
    const accountName = serviceManager[targetService][config.region][config.level].storageName;
    const accountKey = serviceManager[targetService][config.region][config.level].storageKey;
    return {
        accountName: accountName,
        accountKey: accountKey,
        partitionKey: serviceManager[targetService][config.region][config.level].partitionKey,
        tableName: serviceManager[targetService][config.region][config.level].tableName,
        targetService: targetService,
        tableSvc: azure.createTableService(accountName, accountKey)
    }
}

module.exports = getStorageProps;