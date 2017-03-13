const serviceManager = require('./serviceManager');

function isValid(data, target) {
	if(isNullOrEmpty(target) || !serviceManager[target]) {
		return false;
	}
	var isValid = true;
	serviceManager[target].requiredHeaders.map(function (field) {
		if(!hasField(data, field.value)) {
			isValid = false;
		}
	});
	serviceManager[target].requiredKeys.map(function (field) {
		if(!hasField(data, field.value)) {
			isValid = false;
		}
	});
	return isValid;
}

function isNullOrEmpty(value) {
	var result = false;
	if(value === null || value === "" || typeof(value) === "undefined") {
		result = true;
	}
	return result;
}

function hasField(data, field) {
	var result = false;
	if(data && !isNullOrEmpty(data[field])) {
		result = true;
	}
	return result;
}

module.exports = isValid;