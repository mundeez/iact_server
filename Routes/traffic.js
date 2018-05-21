var express = require('express');

var routes = function(Traffic){
    var trafficRouter = express.Router();

    var trafficController = require('../Controllers/traffic')(Traffic)
    trafficRouter.route('/')
        .post(trafficController.post)
        .get(trafficController.get);

    trafficRouter.use('/:trafficId', function(req,res,next){
        Traffic.findById(req.params.trafficId, function(err,traffic){
            if(err)
                res.status(500).send(err);
            else if(traffic)
            {
                req.traffic = traffic;
                next();
            }
            else
            {
                res.status(404).send('no traffic found');
            }
        });
    });
    trafficRouter.route('/:trafficId')
        .get(function(req,res){

            var returnTraffic = req.traffic.toJSON();

            returnTraffic.links = {};
            var newLink = 'http://' + req.headers.host + '/api/traffics/?genre=' + returnTraffic.genre;
            returnTraffic.links.FilterByThisGenre = newLink.replace(' ', '%20');
            res.json(returnTraffic);

        })
        .put(function(req,res){
            req.traffic.title = req.body.title;
            req.traffic.author = req.body.author;
            req.traffic.genre = req.body.genre;
            req.traffic.read = req.body.read;
            req.traffic.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.traffic);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.traffic[p] = req.body[p];
            }

            req.traffic.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.traffic);
                }
            });
        })
        .delete(function(req,res){
            req.traffic.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return trafficRouter;
};

module.exports = routes;