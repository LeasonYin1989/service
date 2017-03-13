const constants = require('./constants');
const config = require('./config');
const serviceManager = require('./serviceManager');
const azure = require('azure-storage');
const uuid = require('node-uuid');
const entityGen = azure.TableUtilities.entityGenerator;

function storeData(data, props) {		
	return new Promise(function (resolve, reject) {
		props.tableSvc.createTableIfNotExists(props.tableName, function(error, result, response){
		  if(error) {
		  	return reject(error);
		  }
		  resolve(insertIntoTable(data, props));
		});
	});	
}

function insertIntoTable(data, props) {	
	const tableData = getTableData(data, props);
	return new Promise(function (resolve, reject) {
		props.tableSvc.insertEntity(props.tableName, tableData, function (error, result, response) {
		  if(error){
		    return reject(error);
		  }
		  resolve();
		});
	});	
};

function getTableData(data, props) {
	let partitionKey = (data.hasOwnProperty(props.partitionKey)) ? data[props.partitionKey] : props.partitionKey
	var tableData = {
		PartitionKey: entityGen.String(partitionKey),
		RowKey: entityGen.String(uuid()),
	};
	serviceManager[props.targetService].requiredHeaders.map(function (header) {
		if(header.storageOptions.storeValue) {
			tableData[header.storageOptions.storeAs] = data[header.value];
		}
	});
	serviceManager[props.targetService].requiredKeys.map(function (key) {
		if(key.storageOptions.storeValue) {
			tableData[key.storageOptions.storeAs] = data[key.value];
		}
	});
	if(serviceManager[props.targetService].storePublicID && partitionKey === props.partitionKey) {
		tableData[constants.public_id] = data[constants.public_id];
	}
	return tableData;
}

module.exports = storeData;