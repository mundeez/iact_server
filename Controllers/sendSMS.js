//response : {
//     receiver: 'contact number',
//     response: 'SMS response'
// }

const https = require('https');

let sendSMS = function (response) {

    let url;

    url = "https://10.99.0.10:4657/sms_forwarder/v1/index?receiver=" + encodeURIComponent(response.receiver) + "&sender=" + config.SMSResponseSender + "&action=snd&msg=" + encodeURIComponent(response.response);

    'use strict';

    var request = require('request');
    var agentOptions;
    var agent;

    agentOptions = {
        host: '10.99.0.10',
        port: '4657',
        path: '/',
        rejectUnauthorized: false
    };

    agent = new https.Agent(agentOptions);

    request({
        url: url,
        method: 'GET',
        agent: agent
    }, function (err, resp, body) {
        if (err) {
            console.log("Error: ", err);
        } else {
            console.log("Body: ", body);
        }
    });
}

module.exports = sendSMS;