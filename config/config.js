// variables
// 1. user_name: sender's name
// 2. school_name
// 3. emis_name
// 4. zone_name
// 5. district_name
// 6. province_name
// 7. user_id
// 8. learner_id
// 9. learner_name

const config = {
    env: "dev",
    authenticationKey: "one_man_army_for_web_app",
    otpSecret: "one_man_army_for_otp",
    SMSResponseSender: "iact-rocs",
    SMSResponseAuthEnable: false,
    successSchoolUpdateMsg: "school_name, with EMIS emis_name has been updated in the system!",
    successSchoolRegistrationMsg: "Congratulations, user_name, you have successfully registered school_name of zone_name Zone in district_name District of province_name Province. EMIS emis_name.",
    successNewLearnerRegCode: "Congratulations, holder of NRC user_id, you have successfully sent your registration code on the iAct course with EMIS emis_name. If details are not correct, inform your facilitator, but continue to work with your colleagues, enjoy the course and send the codes!",
    successNewLearnerRegText: "Congratulations, user_name, you have successfully registered Learner, learner_name.",
    successNewLearnerUpdateText: "Congratulations, user_name, you have successfully registered Learner, learner_name of school_name and zone_name Zone in district_name District of province_name Province. EMIS emis_name.",
    successNewLearnerRegTextSchoolNotExist: "Congratulations, user_name, you have successfully registered Learner learner_name.",
    successFollowerRegMsg: "Congratulations, user_name, you have successfully registered Follower, Type: follower_type, follower_name of zone_name Zone in district_name District of province_name Province.",
    successFollowerUpdateMsg: "Congratulations, user_name, you have successfully updated Follower, Type: follower_type, follower_name of zone_name Zone in district_name District of province_name Province.",
    successSampleTestMsg: "Congratulations learner_name, holder of NRC learner_id, for completing the sample Unit test. Keep working with your colleagues, enjoying the course and sending the codes!",
    successSampleTestRegMsg: "Congratulations holder of NRC learner_id, for registering and completing the sample Unit test. Keep working with your colleagues, enjoying the course and sending the codes! Note: Please get in touch with your direct Facilitator to complete registration of all details.",
    successPreCourseSelfAssessmentMsg: "Congratulations learner_name, holder of NRC learner_id, for completing the Pre-Course self-assessment Unit test. Keep working with your colleagues, enjoying the course and sending the codes!",
    successPreCourseSelfAssessmentRegMsg: "Congratulations holder of NRC learner_id, for registering and completing the Pre-Course self-assessment Unit test. Keep working with your colleagues, enjoying the course and sending the codes! Note: Please get in touch with your direct Facilitator to complete registration of all details.",
    successPostCourseSelfAssessmentMsg: "Congratulations learner_name, holder of NRC learner_id, for completing the Post-Course self-assessment Unit test. Thank you for participating on the iAct course!",
    successPostCourseSelfAssessmentRegMsg: "Congratulations holder of NRC learner_id, for registering and completing the Post-Course self-assessment Unit test. Thank you for participating on the iAct course! Note: Please get in touch with your direct Facilitator to complete registration of all details.",
    successWeeklyTestsMsg: "Correct code received from learner_name, holder of NRC learner_id, for test learner_test thanks. Keep working with your colleagues, enjoying the course and sending codes!",
    successWeeklyTestsRegMsg: "Correct code received from holder of NRC learner_id, for test learner_test thanks. Keep working with your colleagues, enjoying the course and sending codes! Note: Please get in touch with your direct Facilitator to complete registration of all details.",
    successSchoolVisitReportMsg: "Congratulations, user_name, you have successfully sent a School Report for school_name of zone_name Zone in district_name District of province_name Province. EMIS emis_name.",
    successSchoolVisitReportRegMsg: "Congratulations, user_name, you have successfully registered and sent a School Report for EMIS emis_name.",
    errors: {
        blankContactErr: "Contact number field should not be empty.",
        emptyMsgErr: "Unclear code received. Please send one code at a time.",
        unauthorizedErr: "unauthorized",
        dataRequiredErr: "Data is required.",
        usrNotFound: "User not found.",
        passIncorrect: "Password is wrong.",
        invalidContactErr: "The contact number is invalid.",
        unauthorizedContactErr: "Your number is not authorized to make changes. Please contact the Administrator for help.",
        invalidOtherCodeErr: "Unclear code received. Please send one code at a time with exactly 15 (if you like: separated) numbers without additional text. Thank you.",
        invalidPrePostRegCodeErr: "Unclear code received. Please send one code at a time with exactly 18 (if you like: separated) numbers without additional text. Thank you."
    },
    schoolRegSMSPattern: "Unclear message, pls replace $-words with actual content: “sch $EMIS, $Zone, $SchoolName”",
    flwRegSMSPattern: "Unclear message, pls replace $-words with actual content: “flw $NRC, $FirstName, $LastName, $UserRole, $District, $Province, $Zone, $Organization, $ContactNumber“",
    learnerRegSMSPattern: "Unclear message, pls replace $-words with actual content: “reg $NRC, $FirstName, $Surname, $Gender, $GovtTeacher(Y/N), $Highest Ed.Lv, $DateOfApptmnt, $GradesTaught“",
    otpResponseMsg: "OTP with 30 seconds validity has been sent to your registered contact number."
}

module.exports = config;