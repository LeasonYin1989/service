module.exports = {
	na: {
		dev: {
			storageName: "bmwousiosanalyticsdev",
		    storageKey: "0hGv24c/aZY2p4jDg3FXAwUyYP7G/mAr4IcvrGUT6k7A9bDOtbgQnzrEVvryBb5ZXpdTxvlhdnhQCRH525cDrw==",
		    partitionKey: "RAP",
		    tableName: "TestReportAProblem"
		},
		int: {
			storageName: "bmwousiosanalyticsint",
		    storageKey: "B7qtMLHaS2VeiMPxpalAGM7LI3rFiJQpC/WfHb6CIeKPdbGNVIeSkJUuHdtKRrCWwKIV0pw9xlXyxPailUbhhQ==",
		    partitionKey: "RAP",
		    tableName: "TestReportAProblem"
		},
		prod: {
			storageName: "bmwousiosanalytics",
		    storageKey: "GQjLG8Q9tSZCq9fTghgDO7tZ6IrKwlP2lVbvxv6cVO+DrXksnhQ0GHM4HwC6tzT7XaCWGljbea8fWMuC+ev73Q==",
		    partitionKey: "RAP",
		    tableName: "TestReportAProblem"
		}
	},
	row: {
		dev: {
			storageName: "btciosanalyticsstgeeudev",
		    storageKey: "948Doik09BaUsZeRJEL99XjpMR/oXVUki/6gygWatNrGQo/+yvifLrm4dG0sROAQmLAIMSZZl6qXDOza/Qbuig==",
		    partitionKey: "RAP",
		    tableName: "TestReportAProblem"
		},
		int: {
			storageName: "btciosanalyticsstgeeuint",
		    storageKey: "PYRuq4+K9Orpq76ROo4C6h28ifr6oy86qbCQy+CHp2PHjCfOCVQ9+5sZPLjOLGxIifZypBR7u78Hhmn/xnphww==",
		    partitionKey: "RAP",
		    tableName: "TestReportAProblem"
		},
		prod: {
			storageName: "btciosanalyticsstgeeu",
		    storageKey: "9HK2+B1yj9cNsmAw+h8xDDH+4fmPSe4QZzGfStjLCufakLrESZsCKr8EfJF9Lhuc8KshGfS+cPs/q5+6XHZ6aQ==",
		    partitionKey: "RAP",
		    tableName: "TestReportAProblem"
		}
	},
	targetName: "TestReportAProblem",	   
    storePublicID: false,
    reportOptions: {
    	generateReport: false    	
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
		value: "useEmail",
		isBool: true,
		storageOptions: {
			storeValue: true,
			storeAs: "useEmail"
		},
		analyticsOptions: {
			pegValue: false
		}		
	},
	{
		value: "comment",
		isBool: false,
		storageOptions: {
			storeValue: true,
			storeAs: "comment"
		},
		analyticsOptions: {
			pegValue: false
		}		
	}]    
};