var express = require('express');

var routes = function(Learner){
    var learnerRouter = express.Router();

    var learnerController = require('../Controllers/learner')(Learner);
    learnerRouter.route('/')
        .post(learnerController.post)
        .get(learnerController.get);

    learnerRouter.use('/:learnerId', function(req,res,next){
        Learner.findById(req.params.learnerId, function(err,learner){
            if(err)
                res.status(500).send(err);
            else if(learner)
            {
                req.learner = learner;
                next();
            }
            else
            {
                res.status(404).send('no learner found');
            }
        });
    });
    learnerRouter.route('/:learnerId')
        .get(function(req,res){

            var returnLearner = req.learner.toJSON();

            returnLearner.links = {};
            var newLink = 'http://' + req.headers.host + '/api/learners/?genre=' + returnLearner.genre;
            returnLearner.links.FilterByThisGenre = newLink.replace(' ', '%20');
            res.json(returnLearner);

        })
        .put(function(req,res){
            req.learner.title = req.body.title;
            req.learner.author = req.body.author;
            req.learner.genre = req.body.genre;
            req.learner.read = req.body.read;
            req.learner.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.learner);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.learner[p] = req.body[p];
            }

            req.learner.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.learner);
                }
            });
        })
        .delete(function(req,res){
            req.learner.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return learnerRouter;
};

module.exports = routes;