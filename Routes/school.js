var express = require('express');

var routes = function(School){
    var schoolRouter = express.Router();

    var schoolController = require('../Controllers/school')(School)
    schoolRouter.route('/')
        .post(schoolController.post)
        .get(schoolController.get);

    schoolRouter.use('/:schoolId', function(req,res,next){
        School.findById(req.params.schoolId, function(err,school){
            if(err)
                res.status(500).send(err);
            else if(school)
            {
                req.school = school;
                next();
            }
            else
            {
                res.status(404).send('no school found');
            }
        });
    });
    schoolRouter.route('/:schoolId')
        .get(function(req,res){

            var returnSchool = req.school.toJSON();

            returnSchool.links = {};
            var newLink = 'http://' + req.headers.host + '/api/schools/?genre=' + returnSchool.genre;
            returnSchool.links.FilterByThisGenre = newLink.replace(' ', '%20');
            res.json(returnSchool);

        })
        .put(function(req,res){
            req.school.title = req.body.title;
            req.school.author = req.body.author;
            req.school.genre = req.body.genre;
            req.school.read = req.body.read;
            req.school.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.school);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.school[p] = req.body[p];
            }

            req.school.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.school);
                }
            });
        })
        .delete(function(req,res){
            req.school.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return schoolRouter;
};

module.exports = routes;