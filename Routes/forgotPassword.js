var express = require('express');

var routes = function(token){
    var forgotPasswordRouter = express.Router();

    var forgotPasswordController = require('../Controllers/forgotPassword')()
    forgotPasswordRouter.route('/')
        .get(forgotPasswordController.get)
        .post(forgotPasswordController.post);
    
    return forgotPasswordRouter;
};

module.exports = routes;