const config = require('./config');
const azure = require('azure-storage');
const serviceManager = require('./serviceManager');

function getData(props) {		
	return new Promise(function (resolve, reject) {		
		queryEntities(props, null, [], resolve, reject);
	});
}

function queryEntities(props, token, storageData, resolve, reject) {	
	props.tableSvc.queryEntities(props.tableName, null, token, function (error, result) {
	  if(error) {
	  	return reject(error);
	  }
	  storageData = storageData.concat(result);
	  if(result.continuationToken) {
	  	queryEntities(props, result.continuationToken, storageData, resolve, reject);
	  } else { 	
	  	resolve(parseResults(storageData));
	  }
	});	
}

function parseResults(storageData) {
	var parsedResults = "";
	var csvHeaders = getCSVHeaders(storageData);
	parsedResults += csvHeaders;
	storageData.map(function (result) {
		var entities = result.entries;				
		entities.map(function (entity) {
			var parsedEntity = parseEntity(entity);
			parsedResults += parsedEntity;
		});
	});	
	return parsedResults;
}

function getCSVHeaders(storageData) {
	var csvHeaders = "";
	var entity = {};
	if(storageData.length > 0) {
		var entities = storageData[0];
		if(entities.entries.length > 0) {
			entity = entities.entries[0];
		}
	}
	for(key in entity) {
		if(entity.hasOwnProperty(key)) {
			if(key !== ".metadata")
				csvHeaders += key + ",";
		}
	}
	return csvHeaders.substr(0, csvHeaders.length - 1) + "\n";		
}

function parseEntity(entity) {
	var parsedEntity = "";
	var headers = "";
	for (key in entity) {
		if(entity.hasOwnProperty(key)) {
			if(key !== '.metadata') {
				parsedEntity += entity[key]._ + ","				
			}
		}
	}	
	return parsedEntity = parsedEntity.substr(0, parsedEntity.length - 1) + "\n";
}

function getProps(targetService) {
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

module.exports = getData;