var mongoose = require('mongoose');

var provinceModel = new mongoose.Schema({
    province: {
        type: String,
        unique: true,
        required: true,
    },
    province_code: {
        type: String,
        unique: true,
        required: true,
    }
});

module.exports = mongoose.model('Province', provinceModel);