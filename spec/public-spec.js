//
//  public-spec.js
//  tableStorageService
//
//  Created by Felix Angelov, US-201 on 10/20/16.
//  Copyright © 2016 BMW. All rights reserved.
//
const parser = require('../parser.js');
const validator = require('../validate.js');
const constants = require('../constants');

describe("ParseAccessToken", function() {
    const accessTokenHeader = constants.accessTokenHeader;
    const accessTokenBearer = constants.accessTokenBearer;

    it("should return correct accessToken for valid header", function(done) {
        const headers = {};
        headers[accessTokenHeader] = accessTokenBearer + " myAccessToken";
        const expectedAccessToken = "Bearer myAccessToken";

        var accessToken = parser.parseHeadersForKey(headers, accessTokenHeader);
        expect(accessToken).toEqual(expectedAccessToken);
        done();
    });    

    it("should return null for valid header with null value", function(done) {
        const headers = {};
        headers[accessTokenHeader] = null;        
        const expectedAccessToken = null;
        
        var accessToken = parser.parseHeadersForKey(headers, accessTokenHeader);
        expect(accessToken).toEqual(expectedAccessToken);
        done();
    });

    it("should return null for invalid header", function(done) {
        const headers = {};
        headers["invalid_authorization"] = accessTokenBearer + " myAccessToken";        
        const expectedAccessToken = null;
        
        var accessToken = parser.parseHeadersForKey(headers, accessTokenHeader);
        expect(accessToken).toEqual(expectedAccessToken);
        done();
    });

    it("should return null for missing header", function(done) {
        const headers = {};        
        const expectedAccessToken = null;
        
        var accessToken = parser.parseHeadersForKey(headers, accessTokenHeader);
        expect(accessToken).toEqual(expectedAccessToken);
        done();
    });
});

describe("ParseUSID", function() {
    const usidHeader = constants.usidHeader;

    it("should return correct usid for valid header", function(done) {
        const headers = {};
        headers[usidHeader] = "myUSID";
        const expectedUSID = "myUSID";
        
        var usid = parser.parseHeadersForKey(headers, usidHeader);
        expect(usid).toEqual(expectedUSID);
        done();
    });

    it("should return null for valid header with null value", function(done) {
        const headers = {};
        headers[usidHeader] = null;        
        const expectedUSID = null;
        
        var usid = parser.parseHeadersForKey(headers, usidHeader);
        expect(usid).toEqual(expectedUSID);
        done();
    });

    it("should return null for invalid header", function(done) {
        const headers = {};
        headers["invalid_x-btcapi-usid"] = "myUSID";
        const expectedUSID = null;
        
        var usid = parser.parseHeadersForKey(headers, usidHeader);
        expect(usid).toEqual(expectedUSID);
        done();
    });

    it("should return null for missing header", function(done) {
        const headers = {};        
        const expectedUSID = null;
        
        var usid = parser.parseHeadersForKey(headers, usidHeader);
        expect(usid).toEqual(expectedUSID);
        done();
    });
});

describe("ParseUserAgent", function() {
    const userAgentHeader = constants.userAgentHeader;

    it("should return correct userAgent for valid header", function(done) {
        const headers = {};
        headers[userAgentHeader] = "myUserAgent";
        const expectedUserAgent = "myUserAgent";
        
        var userAgent = parser.parseHeadersForKey(headers, userAgentHeader);
        expect(userAgent).toEqual(expectedUserAgent);
        done();
    });

    it("should return null for valid header with null value", function(done) {
        const headers = {};
        headers[userAgentHeader] = null;        
        const expectedUserAgent = null;
        
        var userAgent = parser.parseHeadersForKey(headers, userAgentHeader);
        expect(userAgent).toEqual(expectedUserAgent);
        done();
    });

    it("should return null for invalid header", function(done) {
        const headers = {};
        headers["invalid_user-agent"] = "myUserAgent";
        const expectedUserAgent = null;
        
        var userAgent = parser.parseHeadersForKey(headers, userAgentHeader);
        expect(userAgent).toEqual(expectedUserAgent);
        done();
    });

    it("should return null for missing header", function(done) {
        const headers = {};        
        const expectedUserAgent = null;
        
        var userAgent = parser.parseHeadersForKey(headers, userAgentHeader);
        expect(userAgent).toEqual(expectedUserAgent);
        done();
    });
});

describe("ParseBodyForKey (useEmail)", function() {
    const isBool = true;
    const useEmailKey = "useEmail";

    it("should return correct value for valid body", function(done) {
        const bodyUseEmailTrue = {
            "useEmail": true,
            "comment": "My Comment"
        };
        const bodyUseEmailFalse = {
            "useEmail": false,
            "comment": "My Comment"
        };
        const expectedUseEmailTrue = true;
        const expectedUseEmailFalse = false;        

        var useEmailTrue = parser.parseBodyForKey(bodyUseEmailTrue, useEmailKey, isBool);
        expect(useEmailTrue).toEqual(expectedUseEmailTrue);

        var useEmailFalse = parser.parseBodyForKey(bodyUseEmailFalse, useEmailKey, isBool);
        expect(useEmailFalse).toEqual(expectedUseEmailFalse);
        done();
    });

    it("should return null for garbage value", function(done) {
        const bodyUseEmailGarbage = {
            "useEmail": "garbage",
            "comment": "My Comment"
        };
        
        const expectedUseEmail = null;
        var useEmail = parser.parseBodyForKey(bodyUseEmailGarbage, useEmailKey, isBool);
        expect(useEmail).toEqual(expectedUseEmail);
        done();
    });

    it("should return null value for body with missing field", function(done) {
        const bodyUseEmailMissing = {
            "comment": "My Comment"
        };
        const expectedUseEmail = null;

        var useEmail = parser.parseBodyForKey(bodyUseEmailMissing, useEmailKey, isBool);
        expect(useEmail).toEqual(expectedUseEmail);
        done();
    });
});

describe("ParseBodyForKey (Comment)", function() {
    const commentKey = "comment";
    it("should return comment for body with valid field", function(done) {
        const body = {
            "useEmail": true,
            "comment": "My Comment"
        };
        const expectedComment = "My Comment";

        var comment = parser.parseBodyForKey(body, commentKey);
        expect(comment).toEqual(expectedComment);
        done();
    });

    it("should return null for body with missing field", function(done) {
        const body = {
            "useEmail": false        
        };
        const expectedComment = null;

        var comment = parser.parseBodyForKey(body, commentKey);
        expect(comment).toEqual(expectedComment);
        done();
    });
});

describe("Validator", function() {
    const targetService = "ReportAProblem";
    it("should return true for data with all required fields", function(done) {
        const clientData = {
            "user-agent": 'BMWOne/3.0-490.12 Prod',
            "x-btcapi-usid": 'myUSID',
            "authorization": 'Bearer myAccessToken',
            "useEmail": true,
            "comment": 'My Comment'
        };
        const expected = true;

        var isValid = validator(clientData, targetService);
        expect(isValid).toEqual(expected);
        done();
    });

    it("should return false for data with invalid useEmail field", function(done) {
        const clientData = {
            "user-agent": 'BMWOne/3.0-490.12 Prod',
            "x-btcapi-usid": 'myUSID',
            "authorization": 'Bearer myAccessToken',
            "useEmail": null,
            "comment": 'My Comment'
        };
        const expected = false;

        var isValid = validator(clientData, targetService);
        expect(isValid).toEqual(expected);
        done();
    });

    it("should return false for data with invalid comment field", function(done) {
        const clientData = {
            "user-agent": 'BMWOne/3.0-490.12 Prod',
            "x-btcapi-usid": 'myUSID',
            "authorization": 'Bearer myAccessToken',
            "useEmail": true,
            "comment": ''
        };
        const expected = false;

        var isValid = validator(clientData, targetService);
        expect(isValid).toEqual(expected);
        done();
    });

    it("should return false for data with invalid usid field", function(done) {
        const clientData = {
            "user-agent": 'BMWOne/3.0-490.12 Prod',
            "x-btcapi-usid": null,
            "authorization": 'Bearer myAccessToken',
            "useEmail": false,
            "comment": 'My Comment'
        };
        const expected = false;

        var isValid = validator(clientData, targetService);
        expect(isValid).toEqual(expected);
        done();
    });

    it("should return false for data with invalid accessToken field", function(done) {
        const clientData = {
            "user-agent": 'BMWOne/3.0-490.12 Prod',
            "x-btcapi-usid": 'myUSID',
            "authorization": null ,
            "useEmail": false,
            "comment": 'My Comment'
        };
        const expected = false;

        var isValid = validator(clientData, targetService);
        expect(isValid).toEqual(expected);
        done();
    });

    it("should return false for data with invalid userAgent field", function(done) {
        const clientData = {
            "user-agent": null,
            "x-btcapi-usid": 'myUSID',
            "authorization": 'Bearer myAccessToken',
            "useEmail": false,
            "comment": 'My Comment'
        };
        const expected = false;

        var isValid = validator(clientData, targetService);
        expect(isValid).toEqual(expected);
        done();
    });

    it("should return false for data with missing usid field", function(done) {
        const clientData = {
            "user-agent": 'BMWOne/3.0-490.12 Prod',
            "authorization": 'Bearer myAccessToken',
            "useEmail": false,
            "comment": 'My Comment'
        };
        const expected = false;

        var isValid = validator(clientData, targetService);
        expect(isValid).toEqual(expected);
        done();
    });

    it("should return false for data with missing userAgent field", function(done) {
        const clientData = {
            "x-btcapi-usid": 'myUSID',
            "authorization": 'Bearer myAccessToken',
            "useEmail": false,
            "comment": 'My Comment'
        };
        const expected = false;

        var isValid = validator(clientData);
        expect(isValid).toEqual(expected);
        done();
    });

    it("should return false for data with missing accessToken field", function(done) {
        const clientData = {
            "user-agent": 'BMWOne/3.0-490.12 Prod',
            "x-btcapi-usid": 'myUSID',
            "useEmail": false,
            "comment": 'My Comment'
        };
        const expected = false;

        var isValid = validator(clientData, targetService);
        expect(isValid).toEqual(expected);
        done();
    });

    it("should return false for data with missing useEmail field", function(done) {
        const clientData = {
            "user-agent": 'BMWOne/3.0-490.12 Prod',
            "x-btcapi-usid": 'myUSID',
            "authorization": 'Bearer myAccessToken',
            "comment": 'My Comment'
        };
        const expected = false;

        var isValid = validator(clientData, targetService);
        expect(isValid).toEqual(expected);
        done();
    });

    it("should return false for data with missing comment field", function(done) {
        const clientData = {
            "user-agent": 'BMWOne/3.0-490.12 Prod',
            "x-btcapi-usid": 'myUSID',
            "authorization": 'Bearer myAccessToken',
            "useEmail": false,
        };
        const expected = false;

        var isValid = validator(clientData, targetService);
        expect(isValid).toEqual(expected);
        done();
    });
});