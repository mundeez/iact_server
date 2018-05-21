require('../models/user');
const passport = require('passport');

var loginController = function (UserCreds) {

    var post = function (req, res) {
        if (!req.body) {
            res.status(400);
            res.send('Data is required');
        } else {
            passport.authenticate('local', function (err, user, info) {
                var token;

                // If Passport throws/catches an error
                if (err) {
                    res.status(404).json(err);
                    return;
                }

                if (user) {
                    // If a user is found
                    token = user.generateJwt();
                    res.status(200);
                    res.json({
                        "token": token
                    });
                } else {
                    // If user is not found
                    res.status(401).json("User not found");
                }
            })(req, res);
        }
    }

    return {
        post: post
    }
}

module.exports = loginController;