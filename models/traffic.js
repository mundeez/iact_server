var mongoose = require('mongoose');
var luhn = require("luhn");

var trafficModel = new mongoose.Schema({
    senders_number: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    contactAuthorisation: {
        type: String,
        required: true,
        enum: ["authorized", "unauthorized"]
    },
    isValid: {
        type: String,
        required: true,
        enum: ["valid", "invalid"]
    },
    time_stamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    code_type: {
        type: String,
        enum: ["Registration", "Weekly Test", "School Visit Report", "Sample Test", "Pre-course self-assessment", "Post-course self-assessment", "School Registration", "Textual Registration", "Follower Registration", "Help", "NA"],
        default: "NA"
    },
    code_emis: {
        type: String,
        default: "NA"
    },
    code_nrc: {
        type: String,
        default: "NA"
    },
    code_test_result: {
        type: String,
        default: "NA"
    },
    code_checksum: {
        type: String,
        required: true,
        default: "invalid"
    }
});

trafficModel.methods.computeCode = function () {
    if (Number.isInteger(parseInt(this.message.substring(0, 1))) && parseInt(this.message.substring(0, 1)) != 3) {
        this.contactAuthorisation = "authorized";
    }
    if (luhn.validate(this.message. replace(/-/g, "").replace(/\s/g, "").replace(/_/g, "").replace(/o/g, "0").replace(/O/g, 0).replace(/I/g, "1").replace(/q/g, "9"))) {
        this.message = this.message.replace(/-/g, "").replace(/\s/g, "").replace(/_/g, "").replace(/o/g, "0").replace(/O/g, 0).replace(/I/g, "1").replace(/q/g, "9");
        switch (this.message.substring(0, 1)) {
            case "1": //Registration
                this.contactAuthorisation = "authorized";
                this.isValid = "valid";
                this.code_type = "Registration";
                this.code_nrc = this.message.substring(8, 17);
                this.code_emis = this.message.substring(1, 8);
                this.code_checksum = this.message.substring(this.message.length - 1, this.message.length);
                break;
            case "2": //Weekly Test
                this.contactAuthorisation = "authorized";
                this.isValid = "valid";
                this.code_type = "Weekly Test";
                this.code_nrc = this.message.substring(1, 10);
                this.code_test_result = this.message.substring(10, 14);
                this.code_checksum = this.message.substring(this.message.length - 1, this.message.length);
                break;
            case "3": //School Visit Report
                this.isValid = "valid";
                this.code_type = "School Visit Report";
                this.code_test_result = this.message.substring(8, 14);
                this.code_emis = this.message.substring(1, 8);
                this.code_checksum = this.message.substring(this.message.length - 1, this.message.length);
                break;
            case "4": //Sample Test
                this.contactAuthorisation = "authorized";
                this.isValid = "valid";
                this.code_type = "Sample Test";
                this.code_nrc = this.message.substring(1, 10);
                this.code_test_result = this.message.substring(10, 14);
                this.code_checksum = this.message.substring(this.message.length - 1, this.message.length);
                break;
            case "5": //Pre-course self-assessment
                this.contactAuthorisation = "authorized";
                this.isValid = "valid";
                this.code_type = "Pre-course self-assessment";
                this.code_nrc = this.message.substring(1, 10);
                this.code_test_result = this.message.substring(10, 17);
                this.code_checksum = this.message.substring(this.message.length - 1, this.message.length);
                break;
            case "6": //Post-course self-assessment
                this.contactAuthorisation = "authorized";
                this.isValid = "valid";
                this.code_type = "Post-course self-assessment";
                this.code_nrc = this.message.substring(1, 10);
                this.code_test_result = this.message.substring(10, 17);
                this.code_checksum = this.message.substring(this.message.length - 1, this.message.length);
                break;
            default:
                this.code_checksum = "invalid";
        }
    } else {
        switch (this.message.substring(0, 1)) {
            case "r": //textual Registration
                if ( this.message.split(", ").length === 9 ) {
                    this.isValid = "valid";
                    this.code_type = "Textual Registration";
                    this.code_nrc = this.message.split(", ")[0].split(" ")[1].replace(/\//g, '');
                    this.code_checksum = "NA";
                } else if (this.message == "reg") {
                    this.isValid = "valid";
                    this.code_type = "Textual Registration";
                    this.code_checksum = "NA";
                } else {
                    this.code_type = "Textual Registration";
                    this.isValid = "invalid";
                    this.code_checksum = "NA";
                }
                break;
            case "n": //Notification
                if ( this.message.split(", ").length === 3 ) {
                    this.isValid = "valid";
                    this.code_type = "Notification";
                    this.code_checksum = "NA";
                } else {
                    this.isValid = "invalid";
                }
                break;
            case "s": //School Registration
                if ( this.message.split(", ").length === 3 ) {
                    this.isValid = "valid";
                    this.code_type = "School Registration";
                    this.code_emis = this.message.split(", ")[0].split(" ")[1];
                    this.code_checksum = "NA";
                } else if (this.message == "sch") {
                    this.isValid = "valid";
                    this.code_type = "School Registration";
                    this.code_checksum = "NA";
                } else {
                    this.code_type = "School Registration";
                    this.isValid = "invalid";
                    this.code_checksum = "NA";
                }
                break;
            case "f": //Follower Registration
                if ( this.message.split(", ").length === 9 ) {
                    this.isValid = "valid";
                    this.code_type = "Follower Registration";
                    this.code_nrc = this.message.split(", ")[0].split(" ")[1].replace(/\//g, '');
                    this.code_checksum = "NA";
                } else if (this.message == "flw") {
                    this.code_type = "Follower Registration";
                    this.isValid = "valid";
                    this.code_checksum = "NA";
                } else {
                    this.code_type = "Follower Registration";
                    this.isValid = "invalid";
                    this.code_checksum = "NA";
                }
                break;
            case "h": // send help SMS to administrators
                this.contactAuthorisation = "authorized";
                if ( this.message === "help" ) {
                    this.isValid = "valid";
                    this.code_type = "Help";
                    this.code_checksum = "NA";
                } else {
                    this.code_checksum = "NA";
                    this.code_type = "Help";
                    this.isValid = "invalid";
                }
                break;
            default:
                this.code_checksum = "invalid";
        }
    }
};

module.exports = mongoose.model('Traffic', trafficModel);