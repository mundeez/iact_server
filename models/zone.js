var mongoose = require('mongoose');

var zoneModel = new mongoose.Schema({
    zone_name: {
        type: String,
        required: true,
    },
    emis: {
        type: String,
        unique: true,
        required: true,
    },
    district: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Zone', zoneModel);