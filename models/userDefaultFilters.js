const mongoose = require('mongoose');

const userDefaultsModel = new mongoose.Schema({
    nrc: {
        type: String
    },
    traffic_default: {
        type: String
    },
    learnes_nrc: {
        type: String
    },
    learner_tablet_serial_no: {
        type: String
    },
    learner_province: {
        type: String
    },
    learner_district: {
        type: String
    },
    learner_zone: {
        type: String
    },
    learner_facilitator: {
        type: String
    },
    learner_emis: {
        type: String
    },
    learner_school_name: {
        type: String
    },
    learner_test_module: {
        type: String
    },
    learner_highest_edu_lvl: {
        type: String
    },
    learner_male: {
        type: String
    },
    learner_female: {
        type: String
    },
    learner_govt_teacher: {
        type: String
    },
    learner_comm_school: {
        type: String
    },
    learner_man: {
        type: String
    },
    learner_contact: {
        type: String
    },
    learner_position: {
        type: String
    },
    learner_date: {
        type: Date
    },
    admin_man: {
        type: String
    },
    admin_contact: {
        type: String
    },
    admin_province: {
        type: String
    },
    admin_district: {
        type: String
    },
    admin_zone: {
        type: String
    },
    admin_position: {
        type: String
    },
    admin_date: {
        type: Date
    },
    co_man: {
        type: String
    },
    co_contact: {
        type: String
    },
    co_province: {
        type: String
    },
    co_district: {
        type: String
    },
    co_zone: {
        type: String
    },
    co_position: {
        type: String
    },
    co_date: {
        type: Date
    },
    fo_man: {
        type: String
    },
    fo_fontact: {
        type: String
    },
    fo_province: {
        type: String
    },
    fo_district: {
        type: String
    },
    fo_zone: {
        type: String
    },
    fo_position: {
        type: String
    },
    fo_date: {
        type: Date
    },
    notification_sender_type: {
        type: Date
    },
    notification_flags: {
        type: Date
    },
    notification_sender_flags: {
        type: Date
    },
    notification_date: {
        type: Date
    },
    notification_read: {
        type: Date
    },
    notification_unread: {
        type: Date
    },
    cr_province: {
        type: Date
    },
    cr_district: {
        type: Date
    },
    cr_emis: {
        type: Date
    },
    cr_school_name: {
        type: Date
    },
    cr_zone: {
        type: Date
    },
    cr_facilitator: {
        type: Date
    },
    cr_test_module: {
        type: Date
    },
    cr_high_edu_lvl: {
        type: Date
    },
    cr_govt_teacher: {
        type: Date
    },
    cr_comm_school: {
        type: Date
    },
    cr_male: {
        type: Date
    },
    cr_female: {
        type: Date
    }
});

module.exports = mongoose.model('UserDefaults', userDefaultsModel);