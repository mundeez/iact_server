const mongoose = require('mongoose'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken')
    config = require('../config/config');

var userModel = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, 'email already exists'],
        trim: true
    },
    Initials: {
        type: String
    },
    hash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    user_category: {
        type: String,
        required: true,
        enum: ['SUAD', 'AD', 'CO', 'FO'] //SUAD: Super Admin, AD: Admin, CO: Coordinator, FO: Follower
    },
    follower_category: {
        type: String,
        required: true,
        default: 'NA',
        enum: ['provincial', 'national', 'district', 'zonal', 'NA'] 
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    man: {
        type: String
    },
    nrc: {
        type: String,
        unique: [true, 'nrc exists!'],
    },
    gender: {
        type: String,
        required: true,
        enum: ['M', 'F']
    },
    position: {
        type: String
    },
    organisation: {
        type: String
    },
    function: {
        type: String
    },
    province: {
        type: String
    },
    district: {
        type: String
    },
    zone: {
        type: String
    },
    contact_number: {
        type: String,
        unique: true,
    }, 
    time_stamp: {
        type: Date,
        default: Date.now
    }
});

userModel.methods.saveJSON = function (password) {
    this.setPassword(password);
    this.save(function (error, result) {
        if (error) {
            console.log(error);
        }
    });
};

userModel.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

userModel.methods.validatePassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return this.hash === hash;
};

userModel.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        nrc: this.nrc,
        email: this.email,
        user_category: this.user_category,
        follower_category: this.follower_category,
        district: this.district,
        province: this.province,
        zone: this.zone,
        exp: parseInt(expiry.getTime() / 1000),
    }, config.authenticationKey); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', userModel);