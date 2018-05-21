var mongoose = require('mongoose');

var districtModel = new mongoose.Schema({
    district: {
        type: String,
        unique: true,
        required: true,
    },
    province_code: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('District', districtModel);