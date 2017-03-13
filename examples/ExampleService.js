module.exports = {
	na: {
		dev: {
			storageName: "ExampleServiceStoragedev",
		    storageKey: "azureStorageKey",
		    partitionKey: "ES",
		    tableName: "ExampleServiceTable"
		},
		int: {
			storageName: "ExampleServiceStorageint",
		    storageKey: "azureStorageKey",
		    partitionKey: "ES",
		    tableName: "ExampleServiceTable"
		},
		prod: {
			storageName: "ExampleServiceStorage",
		    storageKey: "azureStorageKey",
		    partitionKey: "ES",
		    tableName: "ExampleServiceTable"
		}
	},
	row: {
		dev: {
			storageName: "ExampleServiceStorageeudev",
		    storageKey: "azureStorageKey",
		    partitionKey: "ES",
		    tableName: "ExampleServiceTable"
		},
		int: {
			storageName: "ExampleServiceStorageeuint",
		    storageKey: "azureStorageKey",
		    partitionKey: "ES",
		    tableName: "ExampleServiceTable"
		},
		prod: {
			storageName: "ExampleServiceStorageeu",
		    storageKey: "azureStorageKey",
		    partitionKey: "ES",
		    tableName: "ExampleServiceTable"
		}
	},
	targetName: "ExampleService",	
    storePublicID: false,
    reportOptions: {
    	generateReport: true,
    	frequency: "weekly",
    	recipients: ["joe.whale@bmwna.com"]
    },
    requiredHeaders: [{
		value: "user-agent",
		storageOptions: {
			storeValue: true,
			storeAs: "userAgent"
		},
		analyticsOptions: {
			pegValue: true,
			pegAs: "userAgent"
		}
	}, 
	{
		value: "x-btcapi-usid",
		storageOptions: {
			storeValue: true,
			storeAs: "usid"
		},
		analyticsOptions: {
			pegValue: true,
			pegAs: "usid"
		}
	},
	{
		value: "authorization",
		storageOptions: {
			storeValue: false
		},
		analyticsOptions: {
			pegValue: false
		}
	}],
    requiredKeys: [{
		value: "customKey1",
		isBool: true,
		storageOptions: {
			storeValue: true,
			storeAs: "key1"
		},
		analyticsOptions: {
			pegValue: false
		}		
	},
	{
		value: "customKey2",
		isBool: false,
		storageOptions: {
			storeValue: true,
			storeAs: "key2"
		},
		analyticsOptions: {
			pegValue: false
		}		
	}]    
};