var express = require('express');

var routes = function(Zone){
    var zoneRouter = express.Router();

    var zoneController = require('../Controllers/zone')(Zone)
    zoneRouter.route('/')
        .post(zoneController.post)
        .get(zoneController.get);

    zoneRouter.use('/:zoneId', function(req,res,next){
        Zone.findById(req.params.zoneId, function(err,zone){
            if(err)
                res.status(500).send(err);
            else if(zone)
            {
                req.zone = zone;
                next();
            }
            else
            {
                res.status(404).send('no zone found');
            }
        });
    });
    zoneRouter.route('/:zoneId')
        .get(function(req,res){

            var returnZone = req.zone.toJSON();

            returnZone.links = {};
            var newLink = 'http://' + req.headers.host + '/api/zones/?genre=' + returnZone.genre;
            returnZone.links.FilterByThisGenre = newLink.replace(' ', '%20');
            res.json(returnZone);

        })
        .put(function(req,res){
            req.zone.title = req.body.title;
            req.zone.author = req.body.author;
            req.zone.genre = req.body.genre;
            req.zone.read = req.body.read;
            req.zone.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.zone);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.zone[p] = req.body[p];
            }

            req.zone.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.zone);
                }
            });
        })
        .delete(function(req,res){
            req.zone.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return zoneRouter;
};

module.exports = routes;