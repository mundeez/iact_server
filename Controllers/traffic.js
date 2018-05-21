const auth = require('basic-auth');
const https = require('https');
const waitUntil = require('wait-until');
const sendSMS = require('./sendSMS');
const Learner = require('./../models/learner');
const School = require('./../models/school');
const config = require('./../config/config');
const User = require('../models/user');
const Traffic = require('../models/traffic');

let trafficController = function (Traffic) {

    let post = function (req, res) {
        // let body = req.query;
        let body = {};
        let traffic;
        let follower;
        let response = {
            receiver: '',
            resp: '',
            response: undefined
        };
        let help_contacts = [];
        let update = {};

        body.isValid = "invalid";

        //check if senders number exists
        if (req.body.senders_number) {
            response.receiver = req.body.senders_number;
            body.senders_number = req.body.senders_number;
            //check if message exists
            if (req.body.message) {
                body.message = req.body.message.toLowerCase();
            } else {
                response.response = config.errors.emptyMsgErr;
                res.status(400);
                res.send(response);
                sendSMS(response);
                return;
            }
            if (req.body.time_stamp) {
                body.time_stamp = parseInt(req.body.time_stamp);
            }
            try {
                User.findOne({ contact_number: response.receiver }).then((sender) => {
                    if (sender) {
                        body.contactAuthorisation = "authorized";
                    } else {
                        body.contactAuthorisation = "unauthorized";
                    }
                    traffic = new Traffic(body);
                    traffic.computeCode();

                    console.log(traffic);

                    if (traffic.contactAuthorisation === "authorized") {
                        switch (traffic.code_type) {
                            case "NA":
                                if (traffic.message.substring(0, 1) == 1 || traffic.message.substring(0, 1) == 5 || traffic.message.substring(0, 1) == 6) {
                                    response.response = config.errors.invalidPrePostRegCodeErr;
                                } else {
                                    response.response = config.errors.invalidOtherCodeErr;
                                }
                                break;
                            case "Registration": //Registration
                                School.findOne({ emis: traffic.code_emis }, function (err, res) {
                                    if (err) return console.log(err);
                                    if (!res) {
                                        let school = new School({ emis: traffic.code_emis });
                                        response.school = school;
                                        response.resp += "School Created.";
                                        school.save();
                                        Learner.findOneAndUpdate({ nrc: traffic.code_nrc }, { $set: { school_emis: traffic.code_emis } }, function (err, res) {
                                            if (err) {
                                                console.log(err);
                                            } else if (!res) {
                                                let learner = new Learner({ school_emis: traffic.code_emis, nrc: traffic.code_nrc });
                                                response.learner = learner;
                                                response.resp += "Learner Created.";
                                                learner.save();
                                                response.response = config.successNewLearnerRegCode.replace("user_id", generateNrcWithSlashes(traffic.code_nrc));
                                            } else {
                                                response.learner = res;
                                                response.resp += "Learner Updated.";
                                                response.response = config.successNewLearnerRegCode.replace("user_id", generateNrcWithSlashes(traffic.code_nrc));
                                            }
                                        });
                                    } else {
                                        if (res.district) {
                                            Learner.findOneAndUpdate({ nrc: traffic.code_nrc }, { $set: 
                                                { 
                                                    school_emis: traffic.code_emis,
                                                    district: res.district,
                                                    zone: res.zone,
                                                    province: res.province
                                                }}, function (err, res) {
                                                if (err) {
                                                    console.log(err);
                                                } else if (!res) {
                                                    let learner = new Learner({ school_emis: traffic.code_emis, nrc: traffic.code_nrc });
                                                    response.learner = learner;
                                                    response.resp += "Learner Created.";
                                                    learner.save();
                                                    response.response = config.successNewLearnerRegCode.replace("user_id", generateNrcWithSlashes(traffic.code_nrc));
                                                } else {
                                                    response.learner = res;
                                                    response.resp += "Learner Updated.";
                                                    response.response = config.successNewLearnerRegCode.replace("user_id", generateNrcWithSlashes(traffic.code_nrc));
                                                }
                                            });
                                        } else {
                                            Learner.findOneAndUpdate({ nrc: traffic.code_nrc }, { $set: { school_emis: traffic.code_emis } }, function (err, res) {
                                                console.log(response.school);
                                                if (err) {
                                                    console.log(err);
                                                } else if (!res) {
                                                    let learner = new Learner({ school_emis: traffic.code_emis, nrc: traffic.code_nrc });
                                                    response.learner = learner;
                                                    response.resp += "Learner Created.";
                                                    learner.save();
                                                    response.response = config.successNewLearnerRegCode.replace("user_id", generateNrcWithSlashes(traffic.code_nrc));
                                                } else {
                                                    response.learner = res;
                                                    response.resp += "Learner Updated.";
                                                    response.response = config.successNewLearnerRegCode.replace("user_id", generateNrcWithSlashes(traffic.code_nrc));
                                                }
                                            });
                                            response.school = res;
                                            response.resp += "School Exists.";
                                        }
                                    }
                                });
                                break;
                            case "Weekly Test": //Weekly Test
                                switch (Math.floor(parseInt(traffic.message.substr(10, 2)) / 5)) {
                                    case 0:
                                        switch (parseInt(traffic.message.substr(10, 2)) % 5) {
                                            case 1:
                                                update = {
                                                    m1w1_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m1w1_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                            case 2:
                                                update = {
                                                    m1w2_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m1w2_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                            case 3:
                                                update = {
                                                    m1w3_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m1w3_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                            case 4:
                                                update = {
                                                    m1w4_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m1w4_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                            case 0:
                                                update = {
                                                    m1w5_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m1w5_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                        }
                                        break;
                                    case 1:
                                        switch (parseInt(traffic.message.substr(10, 2)) % 5) {
                                            case 1:
                                                update = {
                                                    m2w1_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m2w1_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                            case 2:
                                                update = {
                                                    m2w2_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m2w2_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                            case 3:
                                                update = {
                                                    m2w3_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m2w3_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                            case 4:
                                                update = {
                                                    m2w4_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m2w4_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                            case 0:
                                                update = {
                                                    m2w5_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m2w5_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                        }
                                        break;
                                    case 2:
                                        switch (parseInt(traffic.message.substr(10, 2)) % 5) {
                                            case 1:
                                                update = {
                                                    m3w1_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m3w1_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                            case 2:
                                                update = {
                                                    m3w2_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m3w2_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                            case 3:
                                                update = {
                                                    m3w3_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m3w3_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                            case 4:
                                                update = {
                                                    m3w4_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m3w4_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                            case 0:
                                                update = {
                                                    m3w5_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m3w5_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                        }
                                        break;
                                    case 3:
                                        switch (parseInt(traffic.message.substr(10, 2)) % 5) {
                                            case 1:
                                                update = {
                                                    m4w1_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m4w1_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                            case 2:
                                                update = {
                                                    m4w2_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m4w2_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                            case 3:
                                                update = {
                                                    m4w3_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m4w3_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                            case 4:
                                                update = {
                                                    m4w4_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m4w4_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                            case 0:
                                                update = {
                                                    m4w5_pass1: parseInt(traffic.message.substr(14, 1)),
                                                    m4w5_pass2: parseInt(traffic.message.substr(15, 1))
                                                }
                                                break;
                                        }
                                        break;
                                }
                                Learner.findOneAndUpdate({ nrc: traffic.code_nrc }, update, function (err, res) {
                                    if (err) {
                                        console.log(err);
                                    } else if (!res) {
                                        let learner = new Learner({ nrc: traffic.code_nrc });
                                        learner.save();
                                        response.resp += "Learner Inserted.";
                                        response.learner = learner;
                                        response.response = config.successWeeklyTestsRegMsg.replace("learner_test", Object.keys(update)[0].split("_")[0].toUpperCase()).replace("learner_id", generateNrcWithSlashes(traffic.code_nrc));
                                    } else {
                                        learner = res;
                                        response.resp += "Learner updated.";
                                        response.learner = res;
                                        if (res.firstname) {
                                            response.response = config.successWeeklyTestsMsg.replace("learner_test", Object.keys(update)[0].split("_")[0].toUpperCase()).replace("learner_name", res.firstname + " " + res.lastname).replace("learner_id", res.nrc);
                                        } else {
                                            response.response = config.successWeeklyTestsRegMsg.replace("learner_test", Object.keys(update)[0].split("_")[0].toUpperCase()).replace("learner_id", generateNrcWithSlashes(res.nrc));
                                        }
                                        
                                    }
                                });
                                break;
                            case "School Visit Report": //School Visit Report
                                if (sender.follower_category === "zonal" || sender.user_category === "CO") {
                                    update.school_report_result = traffic.code_test_result;
                                    update.school_report_sent_by = sender.nrc;
                                    School.findOneAndUpdate({ 'emis': traffic.code_emis }, update, function (err, res) {
                                        if (err) {
                                            console.log(err);
                                        } else if (!res) {
                                            let school = new School({ emis: traffic.code_emis, school_report_result: traffic.code_test_result, school_report_sent_by: sender.nrc });
                                            school.save();
                                            response.resp += "School Inserted.";
                                            response.school = school;
                                            response.response = config.successSchoolVisitReportRegMsg.replace("user_name", sender.firstname + " " + sender.lastname).replace("emis_name", traffic.code_emis);
                                        } else {
                                            response.school = res;
                                            response.resp += "School Updated.";
                                            if (!res.district) {
                                                response.response = config.successSchoolVisitReportRegMsg.replace("user_name", sender.firstname + " " + sender.lastname).replace("emis_name", traffic.code_emis);
                                            } else {
                                                response.response = config.successSchoolVisitReportMsg.replace("user_name", sender.firstname + " " + sender.lastname).replace("school_name", res.school_name).replace("zone_name", res.zone).replace("district_name", res.district).replace("province_name", res.province).replace("emis_name", res.emis);
                                            }
                                        }
                                    });
                                } else {
                                    response.response = config.errors.unauthorizedContactErr;
                                }
                                break;
                            case "Sample Test": //Sample Test
                                Learner.findOneAndUpdate({ nrc: traffic.code_nrc }, {
                                    sample_test_results: traffic.code_test_result
                                }, function (err, res) {
                                    if (err) {
                                        console.log(err);
                                    } else if (!res) {
                                        let learner = new Learner({
                                            nrc: traffic.code_nrc,
                                            sample_test_results: traffic.code_test_result
                                        });
                                        learner.save();
                                        response.learner = learner;
                                        response.resp += "Learner Created.";
                                        response.response = config.successSampleTestRegMsg.replace("learner_id", generateNrcWithSlashes(traffic.code_nrc));
                                    } else {
                                        response.learner = res;
                                        response.resp += "Learner Updated.";
                                        if (res.firstname) {
                                            response.response = config.successSampleTestMsg.replace("learner_name", res.firstname + " " + res.lastname).replace("learner_id", res.nrc);
                                        } else {
                                            response.response = config.successSampleTestRegMsg.replace("learner_id", generateNrcWithSlashes(res.nrc));
                                        }
                                        
                                    }
                                });
                                break;
                            case "Pre-course self-assessment": //Pre-course self-assessment
                                Learner.findOneAndUpdate({ nrc: traffic.code_nrc }, {
                                    pre_c_sa_test_results: traffic.code_test_result.toString(2).split('1').length - 1
                                }, function (err, res) {
                                    if (err) {
                                        console.log(err);
                                    } else if (!res) {
                                        let learner = new Learner({
                                            nrc: traffic.code_nrc,
                                            sample_test_results: traffic.code_test_result
                                        });
                                        learner.save();
                                        response.learner = learner;
                                        response.resp += "Learner Created.";
                                        response.response = config.successPreCourseSelfAssessmentRegMsg.replace("learner_id", generateNrcWithSlashes(traffic.code_nrc));
                                    } else {
                                        response.learner = res;
                                        response.resp += "Learner Updated.";
                                        if (res.firstname) {
                                            response.response = config.successPreCourseSelfAssessmentMsg.replace("learner_name", res.firstname + " " + res.lastname).replace("learner_id", res.nrc);
                                        } else {
                                            response.response = config.successPreCourseSelfAssessmentRegMsg.replace("learner_id", generateNrcWithSlashes(traffic.code_nrc));
                                        }
                                    }
                                });
                                break;
                            case "Post-course self-assessment": //Post-course self-assessment
                                //store Post-course self-assessment
                                Learner.findOneAndUpdate({ nrc: traffic.code_nrc }, {
                                    post_c_sa_test_results: traffic.code_test_result.toString(2).split('1').length - 1
                                }, function (err, res) {
                                    if (err) {
                                        console.log(err);
                                    } else if (!res) {
                                        let learner = new Learner({
                                            nrc: traffic.code_nrc,
                                            sample_test_results: traffic.code_test_result
                                        });
                                        learner.save();
                                        response.learner = learner;
                                        response.resp += "Learner Created.";
                                        
                                    } else {
                                        response.learner = res;
                                        response.resp += "Learner Updated.";
                                        if (res.firstname) {
                                            response.response = config.successPostCourseSelfAssessmentMsg.replace("learner_name", res.firstname + " " + res.lastname).replace("learner_id", generateNrcWithSlashes(traffic.code_nrc));
                                        } else {
                                            response.response = config.successPostCourseSelfAssessmentRegMsg.replace("learner_id", generateNrcWithSlashes(traffic.code_nrc));
                                        }
                                        
                                    }
                                });
                                break;
                            case "Textual Registration":
                                if (traffic.isValid === "valid" && traffic.message != "reg") {
                                    Learner.findOneAndUpdate({ nrc: traffic.code_nrc },
                                        {
                                            firstname: traffic.message.split(", ")[1],
                                            lastname: traffic.message.split(", ")[2],
                                            gender: traffic.message.split(", ")[3],
                                            govt_teacher: traffic.message.split(", ")[4],
                                            highest_education: traffic.message.split(", ")[5],
                                            date_of_registration: traffic.message.split(", ")[6],
                                            grades_taught: traffic.message.split(", ")[7],
                                            contact_number: traffic.message.split(", ")[8]
                                        }, function (err, res) {
                                            if (err) {
                                                console.log(err);
                                            } else if (!res) {
                                                let learner = new Learner();
                                                learner.nrc = traffic.code_nrc;
                                                learner.firstname = traffic.message.split(", ")[1];
                                                learner.lastname = traffic.message.split(", ")[2];
                                                learner.gender = traffic.message.split(", ")[3];
                                                learner.govt_teacher = traffic.message.split(", ")[4];
                                                learner.highest_education = traffic.message.split(", ")[5];
                                                learner.date_of_registration = traffic.message.split(", ")[6];
                                                learner.grades_taught = traffic.message.split(", ")[7];
                                                learner.contact_number = traffic.message.split(", ")[8];
                                                learner.save();
                                                response.resp += "Learner Inserted.";
                                                response.learner = learner;
                                                response.response = config.successNewLearnerRegText.replace("user_name", sender.firstname + " " + sender.lastname).replace("learner_name", learner.firstname + " " + learner.lastname);
                                            } else {
                                                if (res.school_emis) {
                                                    School.findOne({ emis: res.school_emis }, function (err, school) {
                                                        if (err) {
                                                            console.log(err);
                                                        } else if (school) {
                                                            if (school.district) {
                                                                Learner.update({ nrc: traffic.code_nrc }, {
                                                                    zone: school.zone,
                                                                    district: school.district,
                                                                    province: school.province
                                                                }, function (err, learner) {
                                                                    if (err) {
                                                                        console.log(err);
                                                                    } else {
                                                                        response.learner = res;
                                                                        response.resp += "Learner Updated.";
                                                                        response.response = config.successNewLearnerUpdateText.replace("user_name", sender.firstname + " " + sender.lastname).replace("learner_name", traffic.message.split(", ")[1] + " " + traffic.message.split(", ")[2]).replace("school_name", school.school_name).replace("zone_name", school.zone).replace("district_name", school.district).replace("province_name", school.province).replace("emis_name", school.emis);
                                                                    }
                                                                });
                                                            } else {
                                                                response.response = config.successNewLearnerRegText.replace("user_name", sender.firstname + " " + sender.lastname).replace("learner_name", traffic.message.split(", ")[1] + " " + traffic.message.split(", ")[2]);
                                                            }
                                                        } else {
                                                            response.response = config.successNewLearnerRegText.replace("user_name", sender.firstname + " " + sender.lastname).replace("learner_name", traffic.message.split(", ")[1] + " " + traffic.message.split(", ")[2]);
                                                        }
                                                    });
                                                } else {
                                                    response.response = config.successNewLearnerRegText.replace("user_name", sender.firstname + " " + sender.lastname).replace("learner_name", traffic.message.split(", ")[1] + " " + traffic.message.split(", ")[2]);
                                                }
                                            }
                                        });
                                } else if (traffic.isValid === "valid" && traffic.message === "reg") {
                                    response.response = config.learnerRegSMSPattern;
                                } else {
                                    response.response = config.learnerRegSMSPattern;
                                }
                                break;
                            case "School Registration":
                                if (traffic.message.split(", ").length >= 3 && (sender.follower_category === "zonal" || sender.user_category === "CO")) {
                                    School.findOneAndUpdate({ emis: traffic.code_emis }, {
                                        emis: traffic.message.split(", ")[0].split(" ")[1],
                                        province: sender.province,
                                        district: sender.district,
                                        zone: traffic.message.split(", ")[1],
                                        school_name: traffic.message.split(", ")[2]
                                    }, function (err, res) {
                                        console.log(res);
                                        if (err) {
                                            console.log(err);
                                        } else if (!res) {
                                            let school = new School();
                                            school.emis = traffic.message.split(", ")[0].split(" ")[1];
                                            school.province = sender.province;
                                            school.district = sender.district;
                                            school.zone = traffic.message.split(", ")[1];
                                            school.school_name = traffic.message.split(", ")[2];
                                            school.save();
                                            response.school = school;
                                            response.resp += "School Inserted.";
                                            response.response = config.successSchoolRegistrationMsg.replace("user_name", sender.firstname + " " + sender.lastname).replace("school_name", school.school_name).replace("zone_name", school.zone).replace("district_name", school.district).replace("province_name", school.province).replace("emis_name", school.emis);
                                        } else {
                                            response.school = res;
                                            response.resp += "School Updated.";
                                            response.response = config.successSchoolUpdateMsg.replace("school_name", traffic.message.split(", ")[2]).replace("emis_name", traffic.message.split(", ")[0].split(" ")[1]);
                                        }
                                    });
                                } else if (traffic.message == "sch" && (sender.follower_category === "zonal" || sender.user_category === "CO")) {
                                    response.response = config.schoolRegSMSPattern;
                                } else {
                                    if (sender.follower_category == "zonal" || sender.user_category == "CO") {
                                        response.response = config.schoolRegSMSPattern;
                                    } else {
                                        response.response = config.errors.unauthorizedContactErr;
                                    }
                                }
                                break;
                            case "Follower Registration":
                                if (traffic.isValid == "valid" && traffic.message != "flw") {
                                    User.findOneAndUpdate({ nrc: traffic.code_nrc }, {
                                        "user_category": "FO",
                                        "follower_category": traffic.message.split(", ")[3],
                                        "firstname": traffic.message.split(", ")[1],
                                        "lastname": traffic.message.split(", ")[2],
                                        "nrc": traffic.message.split(", ")[0].split(" ")[1].replace(/\//g, ""),
                                        "gender": "M",
                                        "position": "rocs",
                                        "organisation": traffic.message.split(", ")[7],
                                        "function": "rocs",
                                        "province": traffic.message.split(", ")[5],
                                        "district": traffic.message.split(", ")[4],
                                        "zone": traffic.message.split(", ")[6],
                                        "contact_number": traffic.message.split(", ")[8]
                                    }, function (err, res) {
                                        if (err) {
                                            console.log(err);
                                        } else if (!res) {
                                            let follower = new User({
                                                "user_category": "FO",
                                                "follower_category": traffic.message.split(", ")[3].toLowerCase(),
                                                "firstname": traffic.message.split(", ")[1],
                                                "lastname": traffic.message.split(", ")[2],
                                                "nrc": traffic.message.split(", ")[0].split(" ")[1].replace(/\//g, ""),
                                                "gender": "M",
                                                "position": "rocs",
                                                "organisation": traffic.message.split(", ")[7],
                                                "function": "rocs",
                                                "province": traffic.message.split(", ")[5],
                                                "district": traffic.message.split(", ")[4],
                                                "zone": traffic.message.split(", ")[6],
                                                "contact_number": traffic.message.split(", ")[8]
                                            });
                                            follower.setPassword(follower.nrc);
                                            follower.save();
                                            response.resp += "Follower Inserted.";
                                            response.follower = follower;
                                            response.response = config.successFollowerRegMsg.replace("user_name", sender.firstname + " " + sender.lastname).replace("follower_type", traffic.message.split(", ")[3].toLowerCase()).replace("follower_name", traffic.message.split(", ")[1] + " " + traffic.message.split(", ")[2]).replace("zone_name", traffic.message.split(", ")[6]).replace("district_name", traffic.message.split(", ")[4]).replace("province_name", traffic.message.split(", ")[5]);
                                        } else {
                                            response.resp += "Follower Updated.";
                                            response.follower = res;
                                            response.response = config.successFollowerUpdateMsg.replace("user_name", sender.firstname + " " + sender.lastname).replace("follower_type", traffic.message.split(", ")[3].toLowerCase()).replace("follower_name", traffic.message.split(", ")[1] + " " + traffic.message.split(", ")[2]).replace("zone_name", traffic.message.split(", ")[6]).replace("district_name", traffic.message.split(", ")[4]).replace("province_name", traffic.message.split(", ")[5]);
                                        }
                                    });
                                } else if (traffic.isValid == "valid" && traffic.message == "flw") {
                                    response.response = config.flwRegSMSPattern;
                                } else {
                                    response.response = config.flwRegSMSPattern;
                                }
                                break;
                            case "Help":
                                Learner.findOne({ contact_number: traffic.senders_number}, function (err, learner) {
                                    console.log(err);
                                    if (err) {
                                        console.log(err);
                                    } else if (!learner) {
                                        response.response = "You are not authorized to perform this action. Please register yourself first. Thank you.";
                                    } else {
                                        console.log("learner.district");
                                        if (learner.district) {
                                            User.find({ $and: [
                                                { district: learner.district },
                                                {$or: [ { user_category: "CO" }, {user_category: "AD"} ]}
                                            ]}, function (err, users) {
                                                console.log(users);
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    response.help_contacts = [];
                                                    console.log(users);
                                                    for (var i = 0; i < users.length; i++) {
                                                        response.help_contacts.push(users[i].contact_number);
                                                    }
                                                    response.learner = learner;
                                                    response.response = "Your request has been registered."
                                                }
                                            });
                                        } else {
                                            console.log("!learner.district");
                                            User.find({user_category: "AD"}
                                            , function (err, users) {
                                                console.log(users);
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    response.help_contacts = [];
                                                    console.log(users);
                                                    for (var i = 0; i < users.length; i++) {
                                                        response.help_contacts.push(users[i].contact_number);
                                                    }
                                                    response.learner = learner;
                                                    response.response = "Your request has been registered."
                                                }
                                            });
                                        }
                                    }
                                });
                                break;
                            case "Notification":
                                break;
                            default:
                        }

                        waitUntil(1000, 10, function sendResponse() {
                            return (response.response != undefined ? true : false);
                        }, function done(result) {
                            console.log(result);
                            if (result && traffic.message != "help") {
                                traffic.save(function (err, result) {
                                    if (err) {
                                        res.status(501);
                                        res.send(err);
                                        response.message = "invalid";
                                        sendSMS(response);
                                    } else {
                                        if (!response.contact_info) {
                                            response.contact_info = "NA";
                                        }
                                        if (response.error) {
                                            res.status(400);
                                            res.send(response.error);
                                            sendSMS(response);
                                        } else {
                                            response.message = traffic.code_type != "NA" ? "valid" : "invalid";
                                            res.status(200);
                                            response.message = "valid";
                                            res.send(response);
                                            sendSMS(response);
                                        }
                                    }
                                });
                            } else if (result && traffic.message == "help") {
                                sendSMS(response);
                                if (response.help_contacts) {
                                    for (var i = 0; i < response.help_contacts.length; i++) {
                                        response.receiver = response.help_contacts[i];
                                        response.response = "Learner " + response.learner.firstname + " " + response.learner.lastname + " having NRC - " + generateNrcWithSlashes(response.learner.nrc) + " Contact Line " + response.learner.contact_number + " is looking for some help."
                                        sendSMS(response);
                                    }
                                    res.status(200);
                                    res.send(response);
                                } else {
                                    res.status(401);
                                    res.send(response);
                                }
                            }
                        });
                    } else {
                        traffic.save(function (err, result) {
                            if (traffic.contactAuthorisation === "unauthorized") {
                                response.response = config.errors.unauthorizedContactErr;
                                response.traffic = traffic;
                                res.status(400);
                                res.send(response);
                                response.message = "invalid";
                                sendSMS(response);
                            }
                        });
                    }
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            response.response = config.errors.blankContactErr;
            res.status(400);
            res.send(response);
        }
    }

    let get = function (req, res) {
        let query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        Traffic.find(query, function (err, traffics) {
            if (err)
                res.status(500).send(err);
            else {
                let returnTraffics = [];
                traffics.forEach(function (element, index, array) {
                    let newTraffic = element.toJSON();
                    newTraffic.links = {};
                    newTraffic.links.self = 'http://' + req.headers.host + '/api/traffics/' + newTraffic._id;
                    returnTraffics.push(newTraffic);
                });
                res.json(returnTraffics);
            }
        });
    }

    let generateNrcWithSlashes = function (nrc) {
        return nrc.slice(0, 6) + "/" + nrc.slice(6, 8) + "/" + nrc.slice(8);
    };

    return {
        post: post,
        get: get
    }
}

module.exports = trafficController;