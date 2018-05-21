const otplib = require('otplib'),
    config = require('../config/config'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    sendSMS = require('./sendSMS'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken');

var forgotPasswordController = function () {

    var post = function (req, res) {
        try {
            let response = {};
            const isValid = otplib.authenticator.check(req.body.otp.toString(), req.body.nrc.toString());
            if (isValid) {
                if (req.body.password) {
                    const salt = crypto.randomBytes(16).toString('hex');
                    const hash = crypto.pbkdf2Sync(req.body.password.toString(), salt, 1000, 64, 'sha1').toString('hex');
                    User.findOneAndUpdate({ nrc: req.body.nrc.toString() }, {
                        $set: {
                            salt: salt,
                            hash: hash
                        }
                    }, function (error, user) {
                        if (error) {
                            console.log(error);
                        } else if (user) {
                            response.sender = user.contact_number;
                            res.status(200);
                            response.response = "Password updated successfully!";
                        } else if (!user) {
                            res.status(401);
                            response.response = "NRC not registered!";
                        }
                        console.log(response);
                        res.send(response);
                    });
                } else if (req.body.username) {
                    User.findOne({ nrc: req.body.nrc }, function (user, error) {
                        if (error) {
                            console.log(error);
                        } else if (user) {
                            response.sender = user.contact_number;
                            res.status(200);
                            response.response = "Username modified successfully!";
                        } else if (!user) {
                            res.status(401);
                            response.response = "NRC not registered!";
                        }
                    });
                }
            } else {
                res.status(401);
                res.send("Invalid OTP!");
            }
        } catch (e) {
            console.log(e);
        }
    }

    var get = function (req, res) {
        try {
            let response = {};
            response.receiver = req.query.sender.toString();
            User.findOne({ contact_number: response.receiver }, function (error, user) {
                if (error) {
                    console.log(error);
                } else if (!user) {
                    res.status(401);
                    response.response = "The contact number is not registered.";
                } else {
                    res.status(200);
                    otplib.authenticator.options = {
                        step: 300
                    }
                    console.log(user.nrc);
                    response = otplib.authenticator.generate(user.nrc);
                }
                console.log(response);
                sendSMS(response);
                res.send(response);
            });
        } catch (e) {
            console.log(e);
        }
    }

    return {
        post: post,
        get: get
    }
}

module.exports = forgotPasswordController;