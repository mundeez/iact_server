var express = require('express');

var routes = function(UserCategory){
    var userCategoryRouter = express.Router();

    var userCategoryController = require('../Controllers/userCategory')(UserCategory)
    userCategoryRouter.route('/')
        .post(userCategoryController.post)
        .get(userCategoryController.get);

    userCategoryRouter.use('/:userCategoryId', function(req,res,next){
        UserCategory.findById(req.params.userCategoryId, function(err,userCategory){
            if(err)
                res.status(500).send(err);
            else if(userCategory)
            {
                req.userCategory = userCategory;
                next();
            }
            else
            {
                res.status(404).send('no userCategory found');
            }
        });
    });
    userCategoryRouter.route('/:userCategoryId')
        .get(function(req,res){

            var returnUserCategory = req.userCategory.toJSON();

            returnUserCategory.links = {};
            var newLink = 'http://' + req.headers.host + '/api/userCategorys/?genre=' + returnUserCategory.genre;
            returnUserCategory.links.FilterByThisGenre = newLink.replace(' ', '%20');
            res.json(returnUserCategory);

        })
        .put(function(req,res){
            req.userCategory.title = req.body.title;
            req.userCategory.author = req.body.author;
            req.userCategory.genre = req.body.genre;
            req.userCategory.read = req.body.read;
            req.userCategory.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.userCategory);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.userCategory[p] = req.body[p];
            }

            req.userCategory.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.userCategory);
                }
            });
        })
        .delete(function(req,res){
            req.userCategory.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return userCategoryRouter;
};

module.exports = routes;