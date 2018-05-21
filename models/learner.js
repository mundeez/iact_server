var mongoose = require('mongoose');

var learnerModel = new mongoose.Schema({
    date_of_registration: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    email: {
        type: String,
        trim: true
    },
    govt_teacher: {
        type: String
    },
    highest_education: {
        type: String
    },
    teaching_since: {
        type: String
    },
    grades_taught: {
        type: String,
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    sr_number_tablet: {
        type: Number
    },
    nrc: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    gender: {
        type: String
    },
    school_emis: {
        type: String,
        trim: true
    },
    community_school: {
        type: String
    },
    zone: {
        type: String
    },
    zic_name: {
        type: String
    },
    district: {
        type: String
    },
    zic_phone_number: {
        type: String
    },
    contact_number: {
        type: String
    },
    initials: {
        type: String
    },
    province: {
        type: String
    },
    district_facilitator: {
        type: String
    },
    test_results_received: {
        type: String
    },
    m1w1_pass1: {
        type: String,
    },
    m1w1_pass2: {
        type: String,
    },
    m1w2_pass1: {
        type: String,
    },
    m1w2_pass2: {
        type: String,
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
    },
    pre_c_sa_test_results: {
        type: String
    },
    post_c_sa_test_results: {
        type: String
    },
    sample_test_results: {
        type: String
    }
});

learnerModel.methods.saveJSON = function (password) {
    this.save(function (error, result) {
        if (error) {
            console.log(error);
        }
    });
};

module.exports = mongoose.model('Learner', learnerModel);