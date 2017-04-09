// Copyright IBM Corp. 2017. All Rights Reserved.
// Licensed under "The MIT License (MIT)"
var urlopen = require('urlopen');
var apic = require('local:isp/policy/apim.custom.js');
var querystring = require('querystring')
var props = apic.getPolicyProperty();

var userid = props.userid
var apikey = props.apikey
var token = props.token
var tlsProfile = props.tlsProfile
var timeout = props.timeout

var options = {
    target: "https://api.authy.com/protected/json/verify/" + token + "/" + userid + "?api_key=" + apikey,
    method: 'GET',
    contentType: "application/json",
    sslClientProfile: apic.getvariable('api.org.name') + "-" + tlsProfile,
    timeout: timeout
}
urlopen.open(options, function(error, response) {
    if (response) {
        console.critical('Received from Authy Validate ' + response.statusCode + ' for target ' + options.target);
    }
    if (error) {
        console.critical(props);
        console.critical(options);
        console.critical(error);
        console.critical(response);
        apic.error("APITFA0001", 500, "Error getting response from Authy", "Please refer to the datapower log for more information")
    } else {
        response.readAsJSON(function(readAsError, jsonObj) {
            if (response.statusCode === 401) {
                console.critical(props);
                console.critical(jsonObj);
                console.critical(options);
                apic.error("APITFAV0001", 401, "Token Invalid", jsonObj);
            } else if (response.statusCode != 200) {
                console.critical(props);
                console.critical(jsonObj);
                console.critical(options);
                apic.error("APITFAV0002", 400, "Unkown Error", "Please refer to the datapower log for more information")
            } else {
                console.debug(jsonObj);
                console.debug(options);
                apic.output('application/json');
                session.output.write(jsonObj);
            }
        });
    }
});
