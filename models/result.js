var mongoose = require('mongoose');

var resultModel = new mongoose.Schema({
    learner: {
        type: String,
        unique: true,
        required: true
    },
    m1w1_pass1: {
        type: String,
        required: true,
    },
    m1w1_pass2: {
        type: String,
        required: true,
    },
    m1w2_pass1: {
        type: String,
        required: true,
    },
    m1w2_pass2: {
        type: String,
        required: true,
    },
    m1w3_pass1: {
        type: String
    },
    m1w3_pass2: {
        type: String
    },
    m1w4_pass1: {
        type: String
    },
    m1w4_pass2: {
        type: String
    },
    m1w5_pass1: {
        type: String
    },
    m1w5_pass2: {
        type: String
    },
    m2w1_pass1: {
        type: String
    },
    m2w1_pass2: {
        type: String
    },
    m2w2_pass1: {
        type: String
    },
    m2w2_pass2: {
        type: String
    },
    m2w3_pass1: {
        type: String
    },
    m2w3_pass2: {
        type: String
    },
    m2w4_pass1: {
        type: String
    },
    m2w4_pass2: {
        type: String
    },
    m2w5_pass1: {
        type: String
    },
    m2w5_pass2: {
        type: String
    },
    m3w1_pass1: {
        type: String
    },
    m3w1_pass2: {
        type: String
    },
    m3w2_pass1: {
        type: String
    },
    m3w2_pass2: {
        type: String
    },
    m3w3_pass1: {
        type: String
    },
    m3w3_pass2: {
        type: String
    },
    m3w4_pass1: {
        type: String
    },
    m3w4_pass2: {
        type: String
    },
    m3w5_pass1: {
        type: String
    },
    m3w5_pass2: {
        type: String
    },
    m4w1_pass1: {
        type: String
    },
    m4w1_pass2: {
        type: String
    },
    m4w2_pass1: {
        type: String
    },
    m4w2_pass2: {
        type: String
    },
    m4w3_pass1: {
        type: String
    },
    m4w3_pass2: {
        type: String
    },
    m4w4_pass1: {
        type: String
    },
    m4w4_pass2: {
        type: String
    },
    m4w5_pass1: {
        type: String
    },
    m4w5_pass2: {
        type: String
    }
});

module.exports = mongoose.model('Result', resultModel);