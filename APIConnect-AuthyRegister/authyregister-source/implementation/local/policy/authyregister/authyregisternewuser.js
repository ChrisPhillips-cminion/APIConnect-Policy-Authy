// Copyright IBM Corp. 2017. All Rights Reserved.
// Licensed under "The MIT License (MIT)"

var apic = require('local:isp/policy/apim.custom.js');
var querystring = require('querystring')
var props = apic.getPolicyProperty();
var urlopen = require('urlopen');

var email = props.useremail
var apikey = props.apikey
var phone = props.phone
var cc = props.country
var tlsProfile = props.tlsProfile
var timeout = props.timeout

var postdata = {
    'user[email]': email,
    'user[cellphone]': parseInt(phone),
    'user[country_code]': parseInt(cc)
}
//var data =  querystring.escape('user[email]='+email)+'&'+querystring.escape('user[cellphone]='+parseInt(phone))+'&'+querystring.escape('user[country_code]='+parseInt(cc));
var data =  'user[email]='+email+'&'+'user[cellphone]='+parseInt(phone)+'&'+'user[country_code]='+parseInt(cc);
var options = {
    target: "https://api.authy.com/protected/json/users/new?api_key=" + apikey,//+"&"+data,
    method: 'POST',
    data: data,

    // contentType: "application/json",
    sslClientProfile: apic.getvariable('api.org.name') + "-" + tlsProfile,
    timeout: timeout
}

urlopen.open(options, function(error, response) {
    if (response) {
        console.critical('Received from Authy Register ' + response.statusCode + ' for target ' + options.target);
    }
    if (error) {
        console.critical(options);
        console.critical(error);
        console.critical(response);
        apic.error("APITFA0001", 500, "Error getting response from Authy", "Please refer to the datapower log for more information")
    } else {
        response.readAsJSON(function(readAsError, jsonObj) {
            if (response.statusCode != 200 && response.statusCode != 201) {
                console.critical(jsonObj);
                console.critical(options);
                apic.error("APITFA0002", 400, "Error getting response from Authy",  JSON.stringify(jsonObj));
            } else {
                apic.output('application/json');
                session.output.write(jsonObj);
            }
        });
    }
});
