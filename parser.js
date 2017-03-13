const serviceManager = require('./serviceManager');

function parseClientData(target, headers, body) {  
    if(target && serviceManager[target]) {
        var clientData = {};
        serviceManager[target].requiredHeaders.map(function (header) {
            clientData[header.value] = parseHeadersForKey(headers, header.value);
        });
        serviceManager[target].requiredKeys.map(function (key) {
            clientData[key.value] = parseBodyForKey(body, key.value, key.isBool);
        });
        return clientData;
    } else {
        return null;
    }
}

function keyExists(json, key) {
    var result = false;
    if(json && json[key]) {
        result = true;
    }
    return result;
}

function parseHeadersForKey(headers, key) {
    var result = null;
    if(keyExists(headers, key)) {
        result = headers[key];
    }
    return result;
}

function parseBodyForKey(body, key, isBool) {
    var value = null;
    if(body) {
        if(isBool) {
            if(body[key] === true || body[key] === false) {
                value = body[key];
            }
        } else {
            if(body[key]) {
                value = body[key];
            }
        }
    }                
    return value;
} 

module.exports = {
    parseClientData: parseClientData,
    parseHeadersForKey: parseHeadersForKey,
    parseBodyForKey: parseBodyForKey
};;