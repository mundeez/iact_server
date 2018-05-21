var express = require('express');

var routes = function(District){
    var districtRouter = express.Router();

    var districtController = require('../Controllers/district')(District)
    districtRouter.route('/')
        .post(districtController.post)
        .get(districtController.get);

    districtRouter.use('/:districtId', function(req,res,next){
        District.findById(req.params.districtId, function(err,district){
            if(err)
                res.status(500).send(err);
            else if(district)
            {
                req.district = district;
                next();
            }
            else
            {
                res.status(404).send('no district found');
            }
        });
    });
    districtRouter.route('/:districtId')
        .get(function(req,res){

            var returnDistrict = req.district.toJSON();

            returnDistrict.links = {};
            var newLink = 'http://' + req.headers.host + '/api/districts/?genre=' + returnDistrict.genre;
            returnDistrict.links.FilterByThisGenre = newLink.replace(' ', '%20');
            res.json(returnDistrict);

        })
        .put(function(req,res){
            req.district.title = req.body.title;
            req.district.author = req.body.author;
            req.district.genre = req.body.genre;
            req.district.read = req.body.read;
            req.district.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.district);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.district[p] = req.body[p];
            }

            req.district.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.district);
                }
            });
        })
        .delete(function(req,res){
            req.district.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return districtRouter;
};

module.exports = routes;