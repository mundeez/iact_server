var express = require('express');

var routes = function(Result){
    var resultRouter = express.Router();

    var resultController = require('../Controllers/result')(Result)
    resultRouter.route('/')
        .post(resultController.post)
        .get(resultController.get);

    resultRouter.use('/:resultId', function(req,res,next){
        Result.findById(req.params.resultId, function(err,result){
            if(err)
                res.status(500).send(err);
            else if(result)
            {
                req.result = result;
                next();
            }
            else
            {
                res.status(404).send('no result found');
            }
        });
    });
    resultRouter.route('/:resultId')
        .get(function(req,res){

            var returnResult = req.result.toJSON();

            returnResult.links = {};
            var newLink = 'http://' + req.headers.host + '/api/results/?genre=' + returnResult.genre;
            returnResult.links.FilterByThisGenre = newLink.replace(' ', '%20');
            res.json(returnResult);

        })
        .put(function(req,res){
            req.result.title = req.body.title;
            req.result.author = req.body.author;
            req.result.genre = req.body.genre;
            req.result.read = req.body.read;
            req.result.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.result);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.result[p] = req.body[p];
            }

            req.result.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.result);
                }
            });
        })
        .delete(function(req,res){
            req.result.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return resultRouter;
};

module.exports = routes;