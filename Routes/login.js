var express = require('express');

var routes = function(UserCreds){
    var loginRouter = express.Router();

    var loginController = require('../Controllers/login')(UserCreds)
    loginRouter.route('/')
        .post(loginController.post);
    
    return loginRouter;
};

module.exports = routes;