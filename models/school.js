var mongoose = require('mongoose');

var schoolModel = new mongoose.Schema({
    school_name: {
        type: String
    },
    emis: {
        type: String,
        unique: true,
        required: true,
    },
    zone: {
        type: String
    },
    district: {
        type: String
    }, 
    school_report_result: {
        type: String
    },
    school_report_sent_by: {
        type: String
    },
    school_report_sent_date: {
        type: String,
        default: Date.now()
    },
    province: {
        type: String
    }
});

schoolModel.methods.saveJSON = function () {
    this.save(function (error, result) {
        if (error) {
            console.log(error);
        }
    });
};

module.exports = mongoose.model('School', schoolModel);