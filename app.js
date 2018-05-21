const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path'),
    passport = require('passport'),
    jwt = require('express-jwt'),
    config = require('./config/config'),
    cors = require('cors');

let db;

if (!process.env.SSH_CLIENT) {
    db = mongoose.connect('mongodb://localhost/rocsDB', function (error) {
        if (error) {
            console.log(error);
            return;
        }

        let password = "rocsweb";
        let user = new User({
            "email": "rocs@rocsweb.com",
            "user_category": "SUAD",
            "follower_category": "NA",
            "firstname": "rocs",
            "Initials": "r",
            "lastname": "rocs",
            "man": "1234567890",
            "nrc": "111222333",
            "gender": "M",
            "position": "rocs",
            "organisation": "rocs",
            "function": "rocs",
            "province": "NW",
            "district": "CV",
            "zone": "UN",
            "contact_number": "+260969680241"
        });

        let admin_password = "mundiya@rocsweb";
        let admin = new User({
            "email": "mundiya@rocsweb.com",
            "user_category": "CO",
            "follower_category": "NA",
            "firstname": "Mundiya",
            "Initials": "M",
            "lastname": "Kwalombota",
            "man": "1234567890",
            "nrc": "857787111",
            "gender": "M",
            "position": "rocs",
            "organisation": "Tekeniko",
            "function": "rocs",
            "province": "Lusaka",
            "district": "Lusaka",
            "zone": "NA",
            "contact_number": "+260969680242"
        });

        let admin1_password = "mundiya@rocsweb";
        let admin1 = new User({
            "email": "karthik@rocsweb.com",
            "user_category": "AD",
            "follower_category": "NA",
            "firstname": "Karthik",
            "Initials": "A",
            "lastname": "Nagaraj",
            "man": "123456789",
            "nrc": "857787112",
            "gender": "M",
            "position": "rocs",
            "organisation": "Tekeniko",
            "function": "rocs",
            "province": "Lusaka",
            "district": "Lusaka",
            "zone": "NA",
            "contact_number": "+260969680278"
        });

        let user1_password = "mubu@rocsweb";
        let user1 = new User({
            "email": "Mubu@rocsweb.com",
            "user_category": "FO",
            "follower_category": "zonal",
            "firstname": "Mubu",
            "Initials": "M",
            "lastname": "Kalaluka",
            "man": "1234567890",
            "nrc": "656329111",
            "gender": "M",
            "position": "rocs",
            "organisation": "Tekeniko",
            "function": "rocs",
            "province": "Lusaka",
            "district": "Lusaka",
            "zone": "Malambanyama",
            "contact_number": "+260965846178"
        });

        let user2_password = "marlon@rocsweb";
        let user2 = new User({
            "email": "Marlon@rocsweb.com",
            "user_category": "CO",
            "follower_category": "NA",
            "firstname": "Marlon",
            "Initials": "M",
            "lastname": "Phiri",
            "man": "1234567890",
            "nrc": "222705161",
            "gender": "M",
            "position": "rocs",
            "organisation": "Tekeniko",
            "function": "rocs",
            "province": "Lusaka",
            "district": "Lusaka",
            "zone": "NA",
            "contact_number": "+260950765265"
        });

        let user3_password = "chishimba@rocsweb";
        let user3 = new User({
            "email": "Chishimba@rocsweb.com",
            "user_category": "CO",
            "follower_category": "NA",
            "firstname": "Chishimba",
            "Initials": "M",
            "lastname": "Namutenda",
            "man": "1234567890",
            "nrc": "108293101",
            "gender": "M",
            "position": "rocs",
            "organisation": "Tekeniko",
            "function": "rocs",
            "province": "Lusaka",
            "district": "Kafue",
            "zone": "NA",
            "contact_number": "+260979515216"
        });

        let user4_password = "horward@rocsweb";
        let user4 = new User({
            "email": "Horward@rocsweb.com",
            "user_category": "FO",
            "follower_category": "zonal",
            "firstname": "Horward",
            "Initials": "M",
            "lastname": "Muyuni",
            "man": "1234567890",
            "nrc": "234567711",
            "gender": "M",
            "position": "rocs",
            "organisation": "Tekeniko",
            "function": "rocs",
            "province": "Lusaka",
            "district": "Lusaka",
            "zone": "Malambanyama",
            "contact_number": "+260965846177"
        });

        let userCategories = [
            {
                category_name: "Super Administrator",
                category_code: "SUAD"
            },
            {
                category_name: "Administrator",
                category_code: "AD"
            },
            {
                category_name: "Coordinator",
                category_code: "CO"
            },
            {
                category_name: "Follower",
                category_code: "FO"
            }
        ];

        let followerCategories = [
            {
                follower_category_name: "National follower",
                follower_category_code: "NF"
            },
            {
                follower_category_name: "Privincial follower",
                follower_category_code: "PF"
            },
            {
                follower_category_name: "District follower",
                follower_category_code: "DF"
            },
            {
                follower_category_name: "Zonal follower",
                follower_category_code: "ZF"
            }
        ];

        UserCategory.bulkInsert(userCategories, function (err, results) {
            if (err) {
                console.log(err);
            } else {

            }
        });

        FollowerCategory.bulkInsert(followerCategories, function (err, results) {
            if (err) {
                console.log(err);
            } else {

            }
        });

        user.setPassword(password);
        user.save(function (next, err, result) {
            if (err) {
                console.log(err);
            } else {

            }
        });

        admin.setPassword(admin_password);
        admin.save(function (next, err, result) {
            if (err) {
                console.log(err);
            } else {

            }
        });

        admin1.setPassword(admin1_password);
        admin1.save(function (next, err, result) {
            if (err) {
                console.log(err);
            } else {

            }
        });

        user1.setPassword(user1_password);
        user1.save(function (next, err, result) {
            if (err) {
                console.log(err);
            } else {

            }
        });

        user2.setPassword(user1_password);
        user2.save(function (next, err, result) {
            if (err) {
                console.log(err);
            } else {

            }
        });

        user3.setPassword(user1_password);
        user3.save(function (next, err, result) {
            if (err) {
                console.log(err);
            } else {

            }
        });

        user4.setPassword(user1_password);
        user4.save(function (next, err, result) {
            if (err) {
                console.log(err);
            } else {

            }
        });
    });
} else {
    db = mongoose.connect('mongodb://rocsweb.tekeniko.solutions/rocsDB', { user: "iact_rocs", pass: "I@ct_r0cs" }, function (error) {
        if (error) {
            console.log(error);
            return;
        }
        let password = "123456";
        let user = new User({
            "email": "rocs@rocsweb.com",
            "user_category": "SUAD",
            "follower_category": "NA",
            "firstname": "rocs",
            "Initials": "r",
            "lastname": "rocs",
            "man": "1234567890",
            "nrc": "111222333",
            "gender": "M",
            "position": "rocs",
            "organisation": "rocs",
            "function": "rocs",
            "province": "NW",
            "district": "CV",
            "zone": "UN",
            "contact_number": "+260969680241"
        });

        let admin_password = "mundiya@rocsweb";
        let admin = new User({
            "email": "mundiya@rocsweb.com",
            "user_category": "CO",
            "follower_category": "NA",
            "firstname": "Mundiya",
            "Initials": "M",
            "lastname": "Kwalombota",
            "man": "1234567890",
            "nrc": "857787111",
            "gender": "M",
            "position": "rocs",
            "organisation": "Tekeniko",
            "function": "rocs",
            "province": "Lusaka",
            "district": "Lusaka",
            "zone": "NA",
            "contact_number": "+260969680242"
        });

        let user1_password = "mubu@rocsweb";
        let user1 = new User({
            "email": "Mubu@rocsweb.com",
            "user_category": "FO",
            "follower_category": "zonal",
            "firstname": "Mubu",
            "Initials": "M",
            "lastname": "Kalaluka",
            "man": "1234567890",
            "nrc": "656329111",
            "gender": "M",
            "position": "rocs",
            "organisation": "Tekeniko",
            "function": "rocs",
            "province": "Lusaka",
            "district": "Lusaka",
            "zone": "Malambanyama",
            "contact_number": "+260965846178"
        });

        let user2_password = "marlon@rocsweb";
        let user2 = new User({
            "email": "Marlon@rocsweb.com",
            "user_category": "CO",
            "follower_category": "NA",
            "firstname": "Marlon",
            "Initials": "M",
            "lastname": "Phiri",
            "man": "1234567890",
            "nrc": "222705161",
            "gender": "M",
            "position": "rocs",
            "organisation": "Tekeniko",
            "function": "rocs",
            "province": "Lusaka",
            "district": "Lusaka",
            "zone": "NA",
            "contact_number": "+260950765265"
        });

        let user3_password = "chishimba@rocsweb";
        let user3 = new User({
            "email": "Chishimba@rocsweb.com",
            "user_category": "CO",
            "follower_category": "NA",
            "firstname": "Chishimba",
            "Initials": "M",
            "lastname": "Namutenda",
            "man": "1234567890",
            "nrc": "108293101",
            "gender": "M",
            "position": "rocs",
            "organisation": "Tekeniko",
            "function": "rocs",
            "province": "Lusaka",
            "district": "Kafue",
            "zone": "NA",
            "contact_number": "+260979515216"
        });

        let user4_password = "horward@rocsweb";
        let user4 = new User({
            "email": "Horward@rocsweb.com",
            "user_category": "FO",
            "follower_category": "zonal",
            "firstname": "Horward",
            "Initials": "M",
            "lastname": "Muyuni",
            "man": "1234567890",
            "nrc": "234567711",
            "gender": "M",
            "position": "rocs",
            "organisation": "Tekeniko",
            "function": "rocs",
            "province": "Lusaka",
            "district": "Lusaka",
            "zone": "Malambanyama",
            "contact_number": "+260965846177"
        });

        let userCategories = [
            {
                category_name: "Super Administrator",
                category_code: "SUAD"
            },
            {
                category_name: "Administrator",
                category_code: "AD"
            },
            {
                category_name: "Coordinator",
                category_code: "CO"
            },
            {
                category_name: "Follower",
                category_code: "FO"
            }
        ];

        let followerCategories = [
            {
                follower_category_name: "National follower",
                follower_category_code: "NF"
            },
            {
                follower_category_name: "Privincial follower",
                follower_category_code: "PF"
            },
            {
                follower_category_name: "District follower",
                follower_category_code: "DF"
            },
            {
                follower_category_name: "Zonal follower",
                follower_category_code: "ZF"
            }
        ];

        UserCategory.bulkInsert(userCategories, function (err, results) {
            if (err) {
                console.log(err);
            } else {

            }
        });

        FollowerCategory.bulkInsert(followerCategories, function (err, results) {
            if (err) {
                console.log(err);
            } else {

            }
        });

        user.setPassword(password);
        user.save(function (next, err, result) {
            if (err) {
                console.log(err);
            } else {

            }
        });

        admin.setPassword(admin_password);
        admin.save(function (next, err, result) {
            if (err) {
                console.log(err);
            } else {

            }
        });

        user1.setPassword(user1_password);
        user1.save(function (next, err, result) {
            if (err) {
                console.log(err);
            } else {

            }
        });

        user2.setPassword(user1_password);
        user2.save(function (next, err, result) {
            if (err) {
                console.log(err);
            } else {

            }
        });

        user3.setPassword(user1_password);
        user3.save(function (next, err, result) {
            if (err) {
                console.log(err);
            } else {

            }
        });

        user4.setPassword(user1_password);
        user4.save(function (next, err, result) {
            if (err) {
                console.log(err);
            } else {

            }
        });
    });

}

const auth = jwt({
    secret: config.authenticationKey,
    userProperty: 'payload'
});

const User = require('./models/user');
const Learner = require('./models/learner');
const Result = require('./models/result');
const UserCategory = require('./models/userCategory');
const FollowerCategory = require('./models/followerCategory');
const Traffic = require('./models/traffic');
const School = require('./models/school');
const District = require('./models/district');
const Province = require('./models/province');
const Zone = require('./models/zone');
const UserDefaults = require('./models/userDefaultFilters');

require('./config/passport');

const app = express();

app.use(cors());

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

userRouter = require('./Routes/user')(User);
learnerRouter = require('./Routes/learner')(Learner);
resultRouter = require('./Routes/result')(Result);
userCategoryRouter = require('./Routes/userCategory')(UserCategory);
followerCategoryRouter = require('./Routes/followerCategory')(FollowerCategory);
trafficRouter = require('./Routes/traffic')(Traffic);
loginRouter = require('./Routes/login')(User);
forgotPasswordRouter = require('./Routes/forgotPassword')(User);
schoolRouter = require('./Routes/school')(School);
districtRouter = require('./Routes/district')(District);
provinceRouter = require('./Routes/province')(Province);
zoneRouter = require('./Routes/zone')(Zone);
userDefaultsRouter = require('./Routes/userDefaultFilters')(UserDefaults);

app.use('/api/users', auth, userRouter);
app.use('/api/learners', auth, learnerRouter);
app.use('/api/results', auth, resultRouter);
app.use('/api/userCategories', auth, userCategoryRouter);
app.use('/api/followerCategories', auth, followerCategoryRouter);
app.use('/api/traffic', trafficRouter);
app.use('/api/school', auth, schoolRouter);
app.use('/api/district', auth, districtRouter);
app.use('/api/province', auth, provinceRouter);
app.use('/api/zone', auth, zoneRouter);
app.use('/api/userDefaults', auth, userDefaultsRouter);
app.use('/api/login', loginRouter);
app.use('/api/forgotPassword', forgotPasswordRouter);

app.use(passport.initialize());

app.use(function (err, req, res, next) {
    if (err) {
        res.status(401);
        res.json({ "message": err });
    }
});

app.get('/', function (req, res) {
    res.send('welcome to ROCS API!');
});

app.listen(port, function () {
    console.log('ROCS is running on PORT: ' + port);
});

module.exports = app;