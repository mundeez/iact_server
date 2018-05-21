var express = require('express');

var routes = function(Province){
    var provinceRouter = express.Router();

    var provinceController = require('../Controllers/province')(Province)
    provinceRouter.route('/')
        .post(provinceController.post)
        .get(provinceController.get);

    provinceRouter.use('/:provinceId', function(req,res,next){
        Province.findById(req.params.provinceId, function(err,province){
            if(err)
                res.status(500).send(err);
            else if(province)
            {
                req.province = province;
                next();
            }
            else
            {
                res.status(404).send('no province found');
            }
        });
    });
    provinceRouter.route('/:provinceId')
        .get(function(req,res){

            var returnProvince = req.province.toJSON();

            returnProvince.links = {};
            var newLink = 'http://' + req.headers.host + '/api/provinces/?genre=' + returnProvince.genre;
            returnProvince.links.FilterByThisGenre = newLink.replace(' ', '%20');
            res.json(returnProvince);

        })
        .put(function(req,res){
            req.province.title = req.body.title;
            req.province.author = req.body.author;
            req.province.genre = req.body.genre;
            req.province.read = req.body.read;
            req.province.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.province);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.province[p] = req.body[p];
            }

            req.province.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.province);
                }
            });
        })
        .delete(function(req,res){
            req.province.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return provinceRouter;
};

module.exports = routes;