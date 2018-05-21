var express = require('express');

var routes = function(FollowerCategory){
    var followerCategoryRouter = express.Router();

    var followerCategoryController = require('../Controllers/followerCategory')(FollowerCategory)
    followerCategoryRouter.route('/')
        .post(followerCategoryController.post)
        .get(followerCategoryController.get);

    followerCategoryRouter.use('/:followerCategoryId', function(req,res,next){
        FollowerCategory.findById(req.params.followerCategoryId, function(err,followerCategory){
            if(err)
                res.status(500).send(err);
            else if(followerCategory)
            {
                req.followerCategory = followerCategory;
                next();
            }
            else
            {
                res.status(404).send('no followerCategory found');
            }
        });
    });
    followerCategoryRouter.route('/:followerCategoryId')
        .get(function(req,res){

            var returnFollowerCategory = req.followerCategory.toJSON();

            returnFollowerCategory.links = {};
            var newLink = 'http://' + req.headers.host + '/api/followerCategorys/?genre=' + returnFollowerCategory.genre;
            returnFollowerCategory.links.FilterByThisGenre = newLink.replace(' ', '%20');
            res.json(returnFollowerCategory);

        })
        .put(function(req,res){
            req.followerCategory.title = req.body.title;
            req.followerCategory.author = req.body.author;
            req.followerCategory.genre = req.body.genre;
            req.followerCategory.read = req.body.read;
            req.followerCategory.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.followerCategory);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.followerCategory[p] = req.body[p];
            }

            req.followerCategory.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.followerCategory);
                }
            });
        })
        .delete(function(req,res){
            req.followerCategory.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return followerCategoryRouter;
};

module.exports = routes;