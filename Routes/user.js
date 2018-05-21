var express = require('express');

var routes = function(User){
    var userRouter = express.Router();

    var userController = require('../Controllers/user')(User)
    userRouter.route('/')
        .post(userController.post)
        .get(userController.get)
        .put(userController.put);

    userRouter.use('/:userId', function(req,res,next){
        User.findById(req.params.userId, function(err,user){
            if(err)
                res.status(500).send(err);
            else if(user)
            {
                req.user = user;
                next();
            }
            else {
                res.status(404).send('no user found');
            }
        });
    });
    userRouter.route('/:userId')
        .get(function(req,res){

            var returnUser = req.user.toJSON();

            returnUser.links = {};
            var newLink = 'http://' + req.headers.host + '/api/users/?genre=' + returnUser.genre;
            returnUser.links.FilterByThisGenre = newLink.replace(' ', '%20');
            res.json(returnUser);

        })
        .put(function(req,res){
            req.user.title = req.body.title;
            req.user.author = req.body.author;
            req.user.genre = req.body.genre;
            req.user.read = req.body.read;
            req.user.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.user);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.user[p] = req.body[p];
            }

            req.user.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.user);
                }
            });
        })
        .delete(function(req,res){
            req.user.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return userRouter;
};

module.exports = routes;